<?php
// ============================================
// Vacancies API
// ============================================
require_once __DIR__ . '/../config.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list':
        listVacancies();
        break;
    case 'all':
        listAllVacancies();
        break;
    case 'get':
        getVacancy();
        break;
    case 'create':
        createVacancy();
        break;
    case 'update':
        updateVacancy();
        break;
    case 'delete':
        deleteVacancy();
        break;
    case 'assign_candidate':
        assignCandidate();
        break;
    default:
        jsonResponse(400, 'Invalid action');
}

// Public: list active, non-expired vacancies
function listVacancies()
{
    $db = getDB();
    $companyId = $_GET['company_id'] ?? '';
    $search = $_GET['search'] ?? '';

    $sql = "SELECT v.*, c.name as company_name, c.logo as company_logo 
            FROM vacancies v 
            JOIN companies c ON v.company_id = c.id 
            WHERE v.is_active = 1 
            AND v.publish_date <= CURDATE() 
            AND v.expire_date >= CURDATE()";
    $params = [];

    if (!empty($companyId)) {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    if (!empty($search)) {
        $sql .= " AND (v.title LIKE ? OR v.designation LIKE ? OR v.description LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $sql .= " ORDER BY v.publish_date DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $vacancies = $stmt->fetchAll();

    jsonResponse(200, 'Vacancies retrieved', $vacancies);
}

// Admin: list all vacancies (with filtering by company for sub_admin)
function listAllVacancies()
{
    $auth = verifyToken();
    $db = getDB();

    $sql = "SELECT v.*, c.name as company_name, c.logo as company_logo,
            a_sel.first_name as selected_first_name, a_sel.last_name as selected_last_name,
            a_sel.email as selected_email, a_sel.contact_number as selected_contact_number,
            (SELECT COUNT(*) FROM applications a WHERE a.vacancy_id = v.id) as application_count,
            (SELECT COUNT(*) FROM applications a3 WHERE a3.vacancy_id = v.id AND a3.status = 'pending') as pending_count,
            (SELECT COUNT(*) FROM applications a4 WHERE a4.vacancy_id = v.id AND a4.status = 'under_review') as review_count,
            (SELECT COUNT(*) FROM applications a5 WHERE a5.vacancy_id = v.id AND a5.status = 'rejected') as rejected_count,
            (SELECT COUNT(*) FROM applications a6 WHERE a6.vacancy_id = v.id AND a6.status = 'shortlisted') as shortlisted_count,
            (SELECT COUNT(DISTINCT a2.email) 
             FROM applications a2 
             JOIN vacancies v2 ON a2.vacancy_id = v2.id 
             WHERE a2.future_consent = 1 
               AND a2.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
               AND v2.designation = v.designation
               AND a2.email NOT IN (SELECT email FROM applications WHERE vacancy_id = v.id)) as pool_match_count
            FROM vacancies v 
            JOIN companies c ON v.company_id = c.id
            LEFT JOIN applications a_sel ON v.hired_application_id = a_sel.id";
    $params = [];

    // Sub admin can only see their company's vacancies
    if ($auth['role'] === 'sub_admin') {
        $sql .= " WHERE v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $companyId = $_GET['company_id'] ?? '';
    if (!empty($companyId) && $auth['role'] === 'super_admin') {
        $sql .= " WHERE v.company_id = ?";
        $params[] = $companyId;
    }

    $sql .= " ORDER BY v.created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $vacancies = $stmt->fetchAll();

    jsonResponse(200, 'All vacancies retrieved', $vacancies);
}

function getVacancy()
{
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0)
        jsonResponse(400, 'Invalid vacancy ID');

    $db = getDB();
    $stmt = $db->prepare("SELECT v.*, c.name as company_name, c.logo as company_logo,
                          a_sel.first_name as selected_first_name, a_sel.last_name as selected_last_name,
                          a_sel.email as selected_email, a_sel.contact_number as selected_contact_number
                          FROM vacancies v 
                          JOIN companies c ON v.company_id = c.id 
                          LEFT JOIN applications a_sel ON v.hired_application_id = a_sel.id
                          WHERE v.id = ?");
    $stmt->execute([$id]);
    $vacancy = $stmt->fetch();

    if (!$vacancy)
        jsonResponse(404, 'Vacancy not found');

    jsonResponse(200, 'Vacancy retrieved', $vacancy);
}

function createVacancy()
{
    $auth = verifyToken();
    $input = json_decode(file_get_contents('php://input'), true);

    $required = ['company_id', 'title', 'designation', 'description', 'publish_date', 'expire_date'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonResponse(400, "Field '$field' is required");
        }
    }

    // Sub admin can only create for their company
    if ($auth['role'] === 'sub_admin' && (int)$input['company_id'] !== (int)$auth['company_id']) {
        jsonResponse(403, 'You can only create vacancies for your company');
    }

    $db = getDB();
    $stmt = $db->prepare("INSERT INTO vacancies (company_id, reference_number, title, designation, description, requirements, location, employment_type, min_experience, min_relevant_experience, publish_date, expire_date, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        (int)$input['company_id'],
        sanitize($input['reference_number'] ?? ''),
        sanitize($input['title']),
        sanitize($input['designation']),
        $input['description'],
        $input['requirements'] ?? '',
        sanitize($input['location'] ?? ''),
        $input['employment_type'] ?? 'Full-Time',
        $input['min_experience'] ?? '0-1 years',
        $input['min_relevant_experience'] ?? '0-1 years',
        $input['publish_date'],
        $input['expire_date'],
        $auth['admin_id']
    ]);

    jsonResponse(201, 'Vacancy created successfully', ['id' => $db->lastInsertId()]);
}

function updateVacancy()
{
    $auth = verifyToken();
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0)
        jsonResponse(400, 'Invalid vacancy ID');

    $db = getDB();

    // Check ownership for sub admin
    if ($auth['role'] === 'sub_admin') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only edit your company vacancies');
        }
    }

    $stmt = $db->prepare("UPDATE vacancies SET company_id = ?, reference_number = ?, title = ?, designation = ?, description = ?, requirements = ?, location = ?, employment_type = ?, min_experience = ?, min_relevant_experience = ?, publish_date = ?, expire_date = ?, is_active = ? WHERE id = ?");
    $stmt->execute([
        (int)$input['company_id'],
        sanitize($input['reference_number'] ?? ''),
        sanitize($input['title']),
        sanitize($input['designation']),
        $input['description'],
        $input['requirements'] ?? '',
        sanitize($input['location'] ?? ''),
        $input['employment_type'] ?? 'Full-Time',
        $input['min_experience'] ?? '0-1 years',
        $input['min_relevant_experience'] ?? '0-1 years',
        $input['publish_date'],
        $input['expire_date'],
        (int)($input['is_active'] ?? 1),
        $id
    ]);

    jsonResponse(200, 'Vacancy updated successfully');
}

function deleteVacancy()
{
    $auth = verifyToken();
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0)
        jsonResponse(400, 'Invalid vacancy ID');

    $db = getDB();

    // Check ownership for sub admin
    if ($auth['role'] === 'sub_admin') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only delete your company vacancies');
        }
    }

    $stmt = $db->prepare("DELETE FROM vacancies WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(200, 'Vacancy deleted successfully');
}

function assignCandidate()
{
    $auth = verifyToken();
    $input = json_decode(file_get_contents('php://input'), true);
    
    $vacancyId = (int)($input['vacancy_id'] ?? 0);
    $applicationId = isset($input['application_id']) && $input['application_id'] !== '' ? (int)$input['application_id'] : null;

    if ($vacancyId <= 0) {
        jsonResponse(400, 'Invalid vacancy ID');
    }

    $db = getDB();

    // Check ownership for sub admin
    if ($auth['role'] === 'sub_admin') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$vacancyId]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only assign candidates for your company vacancies');
        }
    }

    // Verify candidate application belongs to this vacancy if assigning
    if ($applicationId !== null) {
        $stmt = $db->prepare("SELECT id, status FROM applications WHERE id = ?");
        $stmt->execute([$applicationId]);
        $app = $stmt->fetch();
        if (!$app) {
            jsonResponse(404, 'Candidate application not found');
        }
    }

    $stmt = $db->prepare("UPDATE vacancies SET hired_application_id = ? WHERE id = ?");
    $stmt->execute([$applicationId, $vacancyId]);

    jsonResponse(200, 'Candidate assigned to vacancy successfully');
}
