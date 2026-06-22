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
    case 'next_reference_number':
        getNextReferenceNumber();
        break;
    case 'pending_approvals':
        listPendingApprovals();
        break;
    case 'approve':
        approveVacancy();
        break;
    case 'reject':
        rejectVacancy();
        break;
    case 'audit_log':
        getVacancyAuditLog();
        break;
    case 'all_audit_logs':
        listAllAuditLogs();
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
            AND v.approval_status = 'approved'
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
            creator.full_name as creator_name,
            creator.role as creator_role,
            sub1_app.full_name as sub1_approved_by_name,
            glob_app.full_name as global_approved_by_name,
            rej.full_name as rejected_by_name,
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
            LEFT JOIN applications a_sel ON v.hired_application_id = a_sel.id
            LEFT JOIN admins creator ON v.created_by = creator.id
            LEFT JOIN admins sub1_app ON v.sub1_approved_by = sub1_app.id
            LEFT JOIN admins glob_app ON v.global_approved_by = glob_app.id
            LEFT JOIN admins rej ON v.rejected_by = rej.id";
    $params = [];

    // Company scoped admins can only see their company's vacancies
    if ($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') {
        $sql .= " WHERE v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $companyId = $_GET['company_id'] ?? '';
    if (!empty($companyId) && ($auth['role'] === 'super_admin' || $auth['role'] === 'admin')) {
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
                          a_sel.email as selected_email, a_sel.contact_number as selected_contact_number,
                          creator.full_name as creator_name,
                          creator.role as creator_role,
                          sub1_app.full_name as sub1_approved_by_name,
                          glob_app.full_name as global_approved_by_name,
                          rej.full_name as rejected_by_name
                          FROM vacancies v 
                          JOIN companies c ON v.company_id = c.id 
                          LEFT JOIN applications a_sel ON v.hired_application_id = a_sel.id
                          LEFT JOIN admins creator ON v.created_by = creator.id
                          LEFT JOIN admins sub1_app ON v.sub1_approved_by = sub1_app.id
                          LEFT JOIN admins glob_app ON v.global_approved_by = glob_app.id
                          LEFT JOIN admins rej ON v.rejected_by = rej.id
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
    if ($auth['role'] === 'super_admin') {
        jsonResponse(403, 'Super Admin does not have write access');
    }
    $input = json_decode(file_get_contents('php://input'), true);

    $required = ['company_id', 'title', 'designation', 'description', 'publish_date', 'expire_date'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonResponse(400, "Field '$field' is required");
        }
    }

    // Company scoped admins can only create for their company
    if (($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') && (int)$input['company_id'] !== (int)$auth['company_id']) {
        jsonResponse(403, 'You can only create vacancies for your company');
    }

    $submitForApproval = isset($input['submit_for_approval']) && $input['submit_for_approval'] === true;

    $status = 'draft';
    if ($submitForApproval) {
        $status = 'approved';
        if ($auth['role'] === 'sub_admin2') {
            $status = 'pending_subadmin1';
        } elseif ($auth['role'] === 'sub_admin1') {
            $status = 'pending_global';
        }
    }

    $db = getDB();
    $stmt = $db->prepare("INSERT INTO vacancies (company_id, reference_number, title, designation, description, requirements, required_skills, location, employment_type, min_experience, min_relevant_experience, publish_date, expire_date, created_by, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        (int)$input['company_id'],
        sanitize($input['reference_number'] ?? ''),
        sanitize($input['title']),
        sanitize($input['designation']),
        $input['description'],
        $input['requirements'] ?? '',
        $input['required_skills'] ?? '',
        sanitize($input['location'] ?? ''),
        $input['employment_type'] ?? 'Full-Time',
        $input['min_experience'] ?? '0-1 years',
        $input['min_relevant_experience'] ?? '0-1 years',
        $input['publish_date'],
        $input['expire_date'],
        $auth['admin_id'],
        $status
    ]);

    $newId = $db->lastInsertId();

    // Log the initiation/submission of vacancy
    logVacancyAction($newId, $auth['admin_id'], $submitForApproval ? 'submitted' : 'initiated', null, $status);

    if ($submitForApproval) {
        jsonResponse(201, 'Vacancy created successfully', ['id' => $newId], true);
        notifyReviewers($newId, $status);
    } else {
        jsonResponse(201, 'Vacancy created successfully', ['id' => $newId]);
    }
}

function updateVacancy()
{
    $auth = verifyToken();
    if ($auth['role'] === 'super_admin') {
        jsonResponse(403, 'Super Admin does not have write access');
    }
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0)
        jsonResponse(400, 'Invalid vacancy ID');

    $db = getDB();

    // Check ownership for company scoped admins
    if ($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only edit your company vacancies');
        }
    }

    $stmtStatus = $db->prepare("SELECT approval_status, sub1_approved_by, sub1_approved_at, global_approved_by, global_approved_at FROM vacancies WHERE id = ?");
    $stmtStatus->execute([$id]);
    $prev = $stmtStatus->fetch();
    $currentStatus = $prev ? $prev['approval_status'] : 'draft';

    $submitForApproval = isset($input['submit_for_approval']) && $input['submit_for_approval'] === true;

    $status = 'draft';
    if ($submitForApproval) {
        $status = 'approved';
        if ($auth['role'] === 'sub_admin2') {
            $status = 'pending_subadmin1';
        } elseif ($auth['role'] === 'sub_admin1') {
            $status = 'pending_global';
        }
    } else {
        if ($auth['role'] === 'admin' || $auth['role'] === 'super_admin') {
            if ($currentStatus === 'approved') {
                $status = 'approved';
            }
        }
    }

    // Determine history variables
    if ($status === 'approved' && $currentStatus === 'approved') {
        $sub1_by = $prev['sub1_approved_by'];
        $sub1_at = $prev['sub1_approved_at'];
        $glob_by = $prev['global_approved_by'] ?? $auth['admin_id'];
        $glob_at = $prev['global_approved_at'] ?? date('Y-m-d H:i:s');
        $rej_by = null;
        $rej_at = null;
    } else {
        $sub1_by = null;
        $sub1_at = null;
        $glob_by = null;
        $glob_at = null;
        $rej_by = null;
        $rej_at = null;
    }

    $stmt = $db->prepare("UPDATE vacancies SET company_id = ?, reference_number = ?, title = ?, designation = ?, description = ?, requirements = ?, required_skills = ?, location = ?, employment_type = ?, min_experience = ?, min_relevant_experience = ?, publish_date = ?, expire_date = ?, is_active = ?, approval_status = ?, rejection_reason = NULL, sub1_approved_by = ?, sub1_approved_at = ?, global_approved_by = ?, global_approved_at = ?, rejected_by = ?, rejected_at = ? WHERE id = ?");
    $stmt->execute([
        (int)$input['company_id'],
        sanitize($input['reference_number'] ?? ''),
        sanitize($input['title']),
        sanitize($input['designation']),
        $input['description'],
        $input['requirements'] ?? '',
        $input['required_skills'] ?? '',
        sanitize($input['location'] ?? ''),
        $input['employment_type'] ?? 'Full-Time',
        $input['min_experience'] ?? '0-1 years',
        $input['min_relevant_experience'] ?? '0-1 years',
        $input['publish_date'],
        $input['expire_date'],
        (int)($input['is_active'] ?? 1),
        $status,
        $sub1_by,
        $sub1_at,
        $glob_by,
        $glob_at,
        $rej_by,
        $rej_at,
        $id
    ]);

    logVacancyAction($id, $auth['admin_id'], $submitForApproval ? 'submitted' : 'edited', $currentStatus, $status);

    if ($submitForApproval) {
        jsonResponse(200, 'Vacancy updated successfully', null, true);
        notifyReviewers($id, $status);
    } else {
        jsonResponse(200, 'Vacancy updated successfully');
    }
}

function deleteVacancy()
{
    $auth = verifyToken();
    if ($auth['role'] === 'super_admin') {
        jsonResponse(403, 'Super Admin does not have write access');
    }
    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0)
        jsonResponse(400, 'Invalid vacancy ID');

    $db = getDB();

    // Check ownership for company scoped admins
    if ($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only delete your company vacancies');
        }
    }

    try {
        // Set hired_application_id to NULL to break circular foreign key dependency
        $stmt = $db->prepare("UPDATE vacancies SET hired_application_id = NULL WHERE id = ?");
        $stmt->execute([$id]);

        $stmt = $db->prepare("DELETE FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);

        jsonResponse(200, 'Vacancy deleted successfully');
    } catch (Exception $e) {
        jsonResponse(500, 'Failed to delete vacancy: ' . $e->getMessage());
    }
}

function assignCandidate()
{
    $auth = verifyToken();
    if ($auth['role'] === 'super_admin') {
        jsonResponse(403, 'Super Admin does not have write access');
    }
    $input = json_decode(file_get_contents('php://input'), true);
    
    $vacancyId = (int)($input['vacancy_id'] ?? 0);
    $applicationId = isset($input['application_id']) && $input['application_id'] !== '' ? (int)$input['application_id'] : null;

    if ($vacancyId <= 0) {
        jsonResponse(400, 'Invalid vacancy ID');
    }

    $db = getDB();

    // Check ownership for company scoped admins
    if ($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$vacancyId]);
        $vacancy = $stmt->fetch();
        if (!$vacancy || (int)$vacancy['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'You can only assign candidates for your company vacancies');
        }
    }

    // Verify candidate application belongs to this vacancy if assigning
    $candidateName = "None";
    if ($applicationId !== null) {
        $stmt = $db->prepare("SELECT id, status, first_name, last_name FROM applications WHERE id = ?");
        $stmt->execute([$applicationId]);
        $app = $stmt->fetch();
        if (!$app) {
            jsonResponse(404, 'Candidate application not found');
        }
        $candidateName = $app['first_name'] . ' ' . $app['last_name'];
    }

    $stmt = $db->prepare("UPDATE vacancies SET hired_application_id = ? WHERE id = ?");
    $stmt->execute([$applicationId, $vacancyId]);

    // Fetch vacancy current status for audit logs
    $stmtVac = $db->prepare("SELECT approval_status FROM vacancies WHERE id = ?");
    $stmtVac->execute([$vacancyId]);
    $vacStatus = $stmtVac->fetchColumn() ?: 'unknown';

    // Audit logging the assignment/hiring
    if ($applicationId !== null) {
        $auditAction = 'candidate_hired';
        $auditReason = "Candidate: " . $candidateName . " hired/assigned to vacancy.";
    } else {
        $auditAction = 'candidate_unassigned';
        $auditReason = "Hired candidate was unassigned from vacancy.";
    }
    logVacancyAction($vacancyId, $auth['admin_id'], $auditAction, $vacStatus, $vacStatus, $auditReason);

    jsonResponse(200, 'Candidate assigned to vacancy successfully');
}

function getNextReferenceNumber()
{
    $auth = verifyToken();
    $db = getDB();
    $companyId = (int)($_GET['company_id'] ?? 0);
    
    if ($companyId <= 0) {
        jsonResponse(400, 'Invalid company ID');
    }

    // If company scoped, verify company matches their own
    if (($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') && $companyId !== (int)$auth['company_id']) {
        jsonResponse(403, 'You can only generate reference numbers for your company');
    }
    
    // Get the company details
    $stmtCompany = $db->prepare("SELECT name FROM companies WHERE id = ?");
    $stmtCompany->execute([$companyId]);
    $company = $stmtCompany->fetch();
    
    if (!$company) {
        jsonResponse(404, 'Company not found');
    }
    
    $companyName = $company['name'];
    $prefix = getCompanyPrefix($companyName);
    
    $year = date('Y');
    $week = date('W');

    // Count how many vacancies were created/published for this company in the current year
    $stmt = $db->prepare("SELECT COUNT(*) as total FROM vacancies WHERE company_id = ? AND YEAR(publish_date) = ?");
    $stmt->execute([$companyId, $year]);
    $row = $stmt->fetch();
    $count = ($row['total'] ?? 0) + 1;

    $refNumber = $prefix . "/" . $year . "/" . $week . "/" . str_pad($count, 3, '0', STR_PAD_LEFT);
    jsonResponse(200, 'Next reference number generated', ['reference_number' => $refNumber]);
}

function getCompanyPrefix($name)
{
    $nameLower = strtolower($name);
    if (strpos($nameLower, 'health') !== false) {
        return 'GSH';
    } elseif (strpos($nameLower, 'engineering') !== false) {
        return 'GSE';
    } elseif (strpos($nameLower, 'travels') !== false) {
        return 'GST';
    } elseif (strpos($nameLower, 'finance') !== false) {
        return 'GSF';
    } elseif (strpos($nameLower, 'solutions') !== false) {
        return 'GSS';
    } elseif (strpos($nameLower, 'retail') !== false) {
        return 'GSR';
    } elseif (strpos($nameLower, 'teas') !== false) {
        return 'ST';
    } elseif (strpos($nameLower, 'motors') !== false) {
        return 'SM';
    } elseif (strpos($nameLower, 'foods') !== false) {
        return 'SF';
    } elseif (strpos($nameLower, 'property') !== false) {
        return 'SP';
    } elseif (strpos($nameLower, 'parent') !== false || strpos($nameLower, 'company ltd') !== false || strpos($nameLower, 'george steuart &') !== false) {
        return 'GS';
    }
    
    // Default fallback: extract initials
    $words = explode(' ', preg_replace('/[^a-z0-9 ]/', '', $nameLower));
    $initials = '';
    foreach ($words as $word) {
        if (!empty($word)) {
            $initials .= $word[0];
        }
    }
    return strtoupper(substr($initials, 0, 4));
}

function listPendingApprovals()
{
    $auth = verifyToken();
    $db = getDB();

    $role = $auth['role'];
    $companyId = $auth['company_id'] ?? null;

    $sql = "SELECT v.*, c.name as company_name, c.logo as company_logo,
            creator.full_name as creator_name, creator.username as creator_username, creator.role as creator_role,
            sub1_app.full_name as sub1_approved_by_name,
            glob_app.full_name as global_approved_by_name,
            rej.full_name as rejected_by_name
            FROM vacancies v 
            JOIN companies c ON v.company_id = c.id
            LEFT JOIN admins creator ON v.created_by = creator.id
            LEFT JOIN admins sub1_app ON v.sub1_approved_by = sub1_app.id
            LEFT JOIN admins glob_app ON v.global_approved_by = glob_app.id
            LEFT JOIN admins rej ON v.rejected_by = rej.id";
    $params = [];

    if ($role === 'sub_admin1') {
        // sub_admin1 approves vacancies created by sub_admin2 (status 'pending_subadmin1') in their company
        // They also want to see status 'pending_global', 'rejected', and 'approved' in their company as read-only pipeline
        $sql .= " WHERE v.company_id = ? AND v.approval_status IN ('draft', 'pending_subadmin1', 'pending_global', 'rejected', 'approved')";
        $params[] = $companyId;
    } elseif ($role === 'super_admin' || $role === 'admin') {
        // global admin or super admin approves vacancies in status 'pending_global' (all companies)
        // They only see approved, pending_global, and rejected vacancies that reached their stage
        $sql .= " WHERE v.approval_status IN ('pending_global', 'approved') OR (v.approval_status = 'rejected' AND (v.sub1_approved_by IS NOT NULL OR creator.role = 'sub_admin1'))";
    } elseif ($role === 'sub_admin2') {
        // sub_admin2 sees their company's vacancies that are not yet approved, rejected, or approved, for their tracking
        $sql .= " WHERE v.company_id = ? AND v.approval_status IN ('draft', 'pending_subadmin1', 'pending_global', 'rejected', 'approved')";
        $params[] = $companyId;
    } else {
        jsonResponse(403, 'Unauthorized access');
    }

    $sql .= " ORDER BY v.created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $vacancies = $stmt->fetchAll();

    jsonResponse(200, 'Pending approvals retrieved', $vacancies);
}

function approveVacancy()
{
    $auth = verifyToken();
    $role = $auth['role'];
    $companyId = $auth['company_id'] ?? null;
    
    $input = json_decode(file_get_contents('php://input'), true);
    $vacancyId = (int)($input['id'] ?? 0);

    if ($vacancyId <= 0) {
        jsonResponse(400, 'Invalid vacancy ID');
    }

    $db = getDB();
    
    // Fetch the vacancy first to check current status and company ownership
    $stmt = $db->prepare("SELECT * FROM vacancies WHERE id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();

    if (!$vacancy) {
        jsonResponse(404, 'Vacancy not found');
    }

    if ($role === 'sub_admin1') {
        // Can only approve pending_subadmin1 for their company
        if ($vacancy['approval_status'] !== 'pending_subadmin1') {
            jsonResponse(400, 'Vacancy is not pending Sub Admin 1 approval');
        }
        if ((int)$vacancy['company_id'] !== (int)$companyId) {
            jsonResponse(403, 'You do not have permission to approve this company\'s vacancies');
        }
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'pending_global', rejection_reason = NULL, sub1_approved_by = ?, sub1_approved_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$auth['admin_id'], $vacancyId]);

        logVacancyAction($vacancyId, $auth['admin_id'], 'sub1_approved', 'pending_subadmin1', 'pending_global');
        
        jsonResponse(200, 'Vacancy approved by Sub Admin 1 and forwarded to Global Admin', null, true);
        
        notifyReviewers($vacancyId, 'pending_global');

    } elseif ($role === 'super_admin' || $role === 'admin') {
        // Can approve pending_global across any company (only after Sub Admin 1 has approved it)
        if ($vacancy['approval_status'] !== 'pending_global') {
            jsonResponse(400, 'Vacancy is not pending Global Admin approval');
        }
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'approved', rejection_reason = NULL, global_approved_by = ?, global_approved_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$auth['admin_id'], $vacancyId]);

        logVacancyAction($vacancyId, $auth['admin_id'], 'global_approved', $vacancy['approval_status'], 'approved');
        
        jsonResponse(200, 'Vacancy approved successfully and is now active/publishable', null, true);
        
        // Notify creator (Sub Admin 2) of final approval
        notifyCreatorApproved($vacancyId);

    } else {
        jsonResponse(403, 'Your role does not have permission to approve vacancies');
    }
}

function rejectVacancy()
{
    $auth = verifyToken();
    $role = $auth['role'];
    $companyId = $auth['company_id'] ?? null;
    
    $input = json_decode(file_get_contents('php://input'), true);
    $vacancyId = (int)($input['id'] ?? 0);
    $reason = sanitize($input['rejection_reason'] ?? '');

    if ($vacancyId <= 0) {
        jsonResponse(400, 'Invalid vacancy ID');
    }
    if (empty($reason)) {
        jsonResponse(400, 'Rejection reason is required');
    }

    $db = getDB();
    
    // Fetch the vacancy first to check current status and company ownership
    $stmt = $db->prepare("SELECT * FROM vacancies WHERE id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();

    if (!$vacancy) {
        jsonResponse(404, 'Vacancy not found');
    }

    if ($role === 'sub_admin1') {
        // Can reject pending_subadmin1 for their company
        if ($vacancy['approval_status'] !== 'pending_subadmin1') {
            jsonResponse(400, 'Vacancy is not in a state that can be rejected by Sub Admin 1');
        }
        if ((int)$vacancy['company_id'] !== (int)$companyId) {
            jsonResponse(403, 'You do not have permission to reject this company\'s vacancies');
        }
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'rejected', rejection_reason = ?, rejected_by = ?, rejected_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$reason, $auth['admin_id'], $vacancyId]);

        logVacancyAction($vacancyId, $auth['admin_id'], 'rejected', 'pending_subadmin1', 'rejected', $reason);
        
        jsonResponse(200, 'Vacancy rejected successfully', null, true);
        
        // Sub Admin 1 rejected — notify only the creator (Sub Admin 2)
        notifyOnRejection($vacancyId, 'sub1_rejected', $reason);

    } elseif ($role === 'super_admin' || $role === 'admin') {
        // Can reject pending_global across any company (only after Sub Admin 1 has approved it)
        if ($vacancy['approval_status'] !== 'pending_global') {
            jsonResponse(400, 'Vacancy is not in a state that can be rejected by Global Admin');
        }
        
        $prevStatus = $vacancy['approval_status'];
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'rejected', rejection_reason = ?, rejected_by = ?, rejected_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$reason, $auth['admin_id'], $vacancyId]);

        logVacancyAction($vacancyId, $auth['admin_id'], 'rejected', $prevStatus, 'rejected', $reason);
        
        jsonResponse(200, 'Vacancy rejected successfully', null, true);
        
        // Admin rejected — notify creator (Sub Admin 2) AND Sub Admin 1 (who previously approved it)
        notifyOnRejection($vacancyId, 'admin_rejected', $reason);

    } else {
        jsonResponse(403, 'Your role does not have permission to reject vacancies');
    }
}

// ---- NOTIFICATION MAIL HELPERS ----

/**
 * Returns a shared GS-branded email shell.
 * $contentHtml goes inside the white content card.
 */
function gsEmailShell($contentHtml)
{
    return "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width,initial-scale=1.0'>
      <style>
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
          }
          .email-header {
            padding: 24px 20px !important;
            border-radius: 0 !important;
          }
          .email-body {
            padding: 28px 20px !important;
          }
          .email-footer {
            padding: 20px 20px !important;
            border-radius: 0 !important;
          }
          .mobile-title {
            font-size: 20px !important;
          }
          .mobile-h2 {
            font-size: 18px !important;
            line-height: 1.3 !important;
          }
        }
      </style>
    </head>
    <body style='margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;'>
      <table width='100%' cellpadding='0' cellspacing='0' style='background:#f1f5f9;padding:32px 0;'>
        <tr><td align='center'>
          <table class='email-container' width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.03);'>

            <!-- HEADER BANNER -->
            <tr>
              <td class='email-header' style='background:linear-gradient(135deg,#1a0208 0%,#2a050b 55%,#3d0813 100%);border-radius:15px 15px 0 0;padding:28px 36px;'>
                <table width='100%' cellpadding='0' cellspacing='0'>
                  <tr>
                    <td>
                      <p style='margin:0;color:rgba(200,169,81,0.9);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;'>George Steuart &amp; Company Ltd</p>
                      <h1 class='mobile-title' style='margin:4px 0 0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.3px;'>Careers Portal</h1>
                    </td>
                    <td align='right'>
                      <div style='width:48px;height:48px;background:rgba(200,169,81,0.15);border:2px solid rgba(200,169,81,0.4);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;'>
                        <span style='color:#C8A951;font-size:22px;font-weight:900;'>GS</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CONTENT CARD -->
            <tr>
              <td class='email-body' style='background:#ffffff;padding:36px;'>
                {$contentHtml}
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td class='email-footer' style='background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 15px 15px;padding:20px 36px;text-align:center;'>
                <p style='margin:0;font-size:11px;color:#94a3b8;line-height:1.6;'>
                  This is an automated notification from the George Steuart Careers Portal.<br>
                  Please do not reply directly to this email.
                </p>
                <p style='margin:8px 0 0;font-size:10px;color:#cbd5e1;'>
                  &copy; " . date('Y') . " George Steuart &amp; Company Ltd. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
    ";
}

/**
 * Renders a vacancy info table row in a clean, vertical stack format
 * which is 100% responsive and readable on mobile.
 */
function gsInfoRow($label, $value, $border = '#f1f5f9')
{
    return "
    <tr>
      <td style='padding:12px 0;border-bottom:1px solid {$border};'>
        <div style='font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:4px;'>{$label}</div>
        <div style='font-size:14px;color:#1e293b;font-weight:600;line-height:1.4;'>{$value}</div>
      </td>
    </tr>
    ";
}

/**
 * Renders a CTA button.
 * $color: 'crimson' | 'green'
 */
function gsButton($label, $url, $color = 'crimson')
{
    $bg = $color === 'green' ? '#16a34a' : '#2a050b';
    return "
    <table cellpadding='0' cellspacing='0' style='margin:0 auto;width:100%;max-width:280px;'>
      <tr>
        <td align='center' style='border-radius:10px;background:{$bg};'>
          <a href='{$url}' target='_blank'
             style='display:block;padding:14px 24px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;letter-spacing:0.3px;text-align:center;'>
            {$label}
          </a>
        </td>
      </tr>
    </table>
    ";
}

/**
 * Renders a status pill badge.
 * $type: 'pending' | 'approved' | 'rejected'
 */
function gsStatusPill($label, $type = 'pending')
{
    $colors = [
        'pending'  => ['bg' => '#fef3c7', 'text' => '#92400e', 'dot' => '#f59e0b'],
        'approved' => ['bg' => '#dcfce7', 'text' => '#166534', 'dot' => '#16a34a'],
        'rejected' => ['bg' => '#fee2e2', 'text' => '#991b1b', 'dot' => '#dc2626'],
    ];
    $c = $colors[$type] ?? $colors['pending'];
    return "
    <span style='display:inline-block;background-color:{$c['bg']};color:{$c['text']};padding:5px 14px;border-radius:100px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;line-height:1.2;vertical-align:middle;'>
      <span style='width:6px;height:6px;border-radius:50%;background-color:{$c['dot']};display:inline-block;vertical-align:middle;margin-right:6px;margin-top:-2px;'></span>
      <span style='vertical-align:middle;'>{$label}</span>
    </span>
    ";
}

function notifyReviewers($vacancyId, $status)
{
    $db = getDB();
    
    // Fetch vacancy title and company name, along with creator role
    $stmt = $db->prepare("
        SELECT v.title, v.reference_number, c.name as company_name, creator.role as creator_role 
        FROM vacancies v 
        JOIN companies c ON v.company_id = c.id 
        JOIN admins creator ON v.created_by = creator.id 
        WHERE v.id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();
    if (!$vacancy) return;
    
    $title = $vacancy['title'];
    $refNumber = $vacancy['reference_number'];
    $companyName = $vacancy['company_name'];
    $creatorRole = $vacancy['creator_role'];

    // Check if this vacancy has ever been rejected (which indicates it is a resubmission)
    $stmtRej = $db->prepare("SELECT COUNT(*) FROM vacancy_audit_logs WHERE vacancy_id = ? AND action = 'rejected'");
    $stmtRej->execute([$vacancyId]);
    $isResubmission = ($stmtRej->fetchColumn() > 0);
    
    if ($status === 'pending_subadmin1') {
        $stmtAdmins = $db->prepare("SELECT email, full_name FROM admins WHERE role = 'sub_admin1' AND company_id = (SELECT company_id FROM vacancies WHERE id = ?) AND is_active = 1");
        $stmtAdmins->execute([$vacancyId]);
        $reviewers = $stmtAdmins->fetchAll();
        
        if ($isResubmission) {
            $subject = "Action Required: Resubmitted Vacancy Requisition Pending Approval - $refNumber";
            $bodyHeader = "A vacancy requisition has been revised and resubmitted, and requires your approval as <strong>Sub Admin 1</strong>.";
        } else {
            $subject = "Action Required: New Vacancy Requisition Pending Approval - $refNumber";
            $bodyHeader = "A new vacancy requisition has been submitted and requires your approval as <strong>Sub Admin 1</strong>.";
        }
    } elseif ($status === 'pending_global') {
        $stmtAdmins = $db->prepare("SELECT email, full_name FROM admins WHERE role IN ('admin', 'super_admin') AND is_active = 1");
        $stmtAdmins->execute();
        $reviewers = $stmtAdmins->fetchAll();
        
        if ($isResubmission) {
            $subject = "Action Required: Resubmitted Vacancy Requisition Pending Global Approval - $refNumber";
            if ($creatorRole === 'sub_admin1') {
                $bodyHeader = "A vacancy requisition has been revised and resubmitted by Sub Admin 1, and now requires your approval as <strong>Global Admin</strong>.";
            } else {
                $bodyHeader = "A vacancy requisition has been revised and approved by Sub Admin 1, and now requires your approval as <strong>Global Admin</strong>.";
            }
        } else {
            $subject = "Action Required: Vacancy Requisition Pending Global Approval - $refNumber";
            if ($creatorRole === 'sub_admin1') {
                $bodyHeader = "A new vacancy requisition has been created by Sub Admin 1 and now requires your approval as <strong>Global Admin</strong>.";
            } else {
                $bodyHeader = "A vacancy requisition has been approved by Sub Admin 1 and now requires your approval as <strong>Global Admin</strong>.";
            }
        }
    } else {
        return;
    }
    
    foreach ($reviewers as $reviewer) {
        $reviewUrl = FRONTEND_URL . "/admin/approvals?highlight={$vacancyId}";
        
        if ($status === 'pending_subadmin1') {
            $pillHtml   = gsStatusPill('Pending Your Approval', 'pending');
            if ($isResubmission) {
                $headingTxt = 'Resubmitted Requisition Requires Your Review';
                $introPara  = "A previously rejected job vacancy requisition has been edited and <strong>resubmitted for approval</strong> by Sub Admin 2. It is now awaiting your review as Sub Admin 1 before it proceeds to the Global Admin.";
            } else {
                $headingTxt = 'New Requisition Requires Your Review';
                $introPara  = "A new job vacancy requisition has been submitted by your team and is <strong>awaiting your approval</strong> as Sub Admin 1 before it proceeds to the Global Admin.";
            }
            $noteHtml   = "<p style='margin:0 0 8px;font-size:13px;color:#475569;'>Please review the details carefully and either <strong>approve</strong> to forward it to the Global Admin, or <strong>reject</strong> with a reason.</p>";
            $btnLabel   = '&#128269;&nbsp; Review &amp; Approve Requisition';
        } else {
            $pillHtml   = gsStatusPill('Awaiting Global Approval', 'pending');
            if ($isResubmission) {
                if ($creatorRole === 'sub_admin1') {
                    $headingTxt = 'Resubmitted Requisition Created by Sub Admin 1 — Your Action Required';
                    $introPara  = "A job vacancy requisition has been <strong>revised and resubmitted directly by Sub Admin 1</strong>, and is now awaiting your final approval as <strong>Global Admin</strong>.";
                } else {
                    $headingTxt = 'Resubmitted Requisition Approved by Sub Admin 1 — Your Action Required';
                    $introPara  = "A previously rejected job vacancy requisition has been edited, approved by Sub Admin 1, and is now awaiting your final approval as <strong>Global Admin</strong> to publish it on the careers portal.";
                }
            } else {
                if ($creatorRole === 'sub_admin1') {
                    $headingTxt = 'New Requisition Created by Sub Admin 1 — Your Action Required';
                    $introPara  = "A job vacancy requisition has been <strong>created directly by Sub Admin 1</strong> and is now awaiting your final approval as <strong>Global Admin</strong> to publish it on the careers portal.";
                } else {
                    $headingTxt = 'Requisition Approved by Sub Admin 1 — Your Action Required';
                    $introPara  = "A job vacancy requisition has been <strong>approved by Sub Admin 1</strong> and is now awaiting your final approval as <strong>Global Admin</strong> to publish it on the careers portal.";
                }
            }
            $noteHtml   = "<p style='margin:0 0 8px;font-size:13px;color:#475569;'>Please log in to the Careers Portal and review this requisition. You can approve it to make it live, or reject it with a reason.</p>";
            $btnLabel   = '&#9989;&nbsp; Review &amp; Give Final Approval';
        }

        $infoRows = gsInfoRow('Position / Title', htmlspecialchars($title))
                  . gsInfoRow('Reference No.', "<span style='font-family:monospace;font-size:13px;color:#C8A951;'>" . htmlspecialchars($refNumber) . "</span>")
                  . gsInfoRow('Company', htmlspecialchars($companyName));

        $contentHtml = "
          <!-- Greeting -->
          <p style='margin:0 0 6px;font-size:14px;color:#64748b;'>Dear <strong style='color:#1e293b;'>{$reviewer['full_name']}</strong>,</p>

          <!-- Status Pill + Heading -->
          <div style='margin:16px 0 8px;'>{$pillHtml}</div>
          <h2 style='margin:0 0 12px;font-size:20px;font-weight:800;color:#1a0208;line-height:1.3;'>{$headingTxt}</h2>

          <!-- Intro -->
          <p style='margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;'>{$introPara}</p>

          <!-- Vacancy Info Card -->
          <div style='background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;'>
            <p style='margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;'>Requisition Details</p>
            <table width='100%' cellpadding='0' cellspacing='0'>
              {$infoRows}
            </table>
          </div>

          <!-- Note -->
          <div style='background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px 18px;margin-bottom:28px;'>
            <p style='margin:0 0 4px;font-size:11px;font-weight:700;color:#c2410c;text-transform:uppercase;letter-spacing:0.5px;'>&#9888;&nbsp; Action Required</p>
            {$noteHtml}
          </div>

          <!-- CTA Button -->
          <div style='text-align:center;margin-bottom:8px;'>
            " . gsButton($btnLabel, $reviewUrl, 'crimson') . "
          </div>
        ";

        $body = gsEmailShell($contentHtml);
        queueEmail($reviewer['email'], $reviewer['full_name'], $subject, $body);
    }
}

/**
 * Notify when admin globally approves — emails the creator (Sub Admin 2)
 */
function notifyCreatorApproved($vacancyId)
{
    $db = getDB();
    $stmt = $db->prepare("
        SELECT v.id, v.title, v.reference_number, v.company_id, c.name AS company_name,
               creator.email AS creator_email, creator.full_name AS creator_name, creator.role AS creator_role
        FROM vacancies v
        JOIN companies c ON v.company_id = c.id
        JOIN admins creator ON v.created_by = creator.id
        WHERE v.id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();
    if (!$vacancy) return;

    $title       = $vacancy['title'];
    $refNumber   = $vacancy['reference_number'];
    $companyName = $vacancy['company_name'];
    $portalUrl   = FRONTEND_URL . "/admin/vacancies?highlight={$vacancyId}";

    $infoRows = gsInfoRow('Position / Title', htmlspecialchars($title), '#dcfce7')
              . gsInfoRow('Reference No.', "<span style='font-family:monospace;color:#16a34a;'>" . htmlspecialchars($refNumber) . "</span>", '#dcfce7')
              . gsInfoRow('Company', htmlspecialchars($companyName), '#dcfce7')
              . gsInfoRow('Status', gsStatusPill('APPROVED &amp; LIVE', 'approved'), '#dcfce7');

    $buildApprovalBody = function($recipientName, $recipientEmail, $creatorEmail, $creatorName) use ($title, $refNumber, $companyName, $portalUrl, $infoRows) {
        if ($recipientEmail === $creatorEmail) {
            $introText = "Great news! The job vacancy requisition you submitted has been <strong>approved by the Global Admin</strong> and is now <strong>successfully published and live</strong> on the careers portal. Candidates can now view and apply for this position.";
        } else {
            $introText = "Great news! The job vacancy requisition created by <strong>{$creatorName}</strong> has been <strong>fully approved and published</strong>. It is now <strong>live</strong> on the careers portal.";
        }

        $contentHtml = "
          <p style='margin:0 0 6px;font-size:14px;color:#64748b;'>Dear <strong style='color:#1e293b;'>{$recipientName}</strong>,</p>

          <div style='margin:16px 0 8px;'>" . gsStatusPill('Approved &amp; Published', 'approved') . "</div>
          <h2 class='mobile-h2' style='margin:0 0 12px;font-size:20px;font-weight:800;color:#166534;line-height:1.3;'>&#127881;&nbsp; Vacancy Approved &amp; Published</h2>

          <p style='margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;'>
            {$introText}
          </p>

          <div style='background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;'>
            <p style='margin:0 0 14px;font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:1px;'>Approved Requisition</p>
            <table width='100%' cellpadding='0' cellspacing='0'>
              {$infoRows}
            </table>
          </div>

          <div style='text-align:center;margin-bottom:8px;'>
            " . gsButton('&#128196;&nbsp; View Vacancy in Portal', $portalUrl, 'green') . "
          </div>
        ";
        return gsEmailShell($contentHtml);
    };

    $subject = "&#127881; Vacancy Approved &amp; Published — {$refNumber}";

    // Gather recipients (email => name)
    $recipients = [];

    // 1. Creator is always notified
    $recipients[$vacancy['creator_email']] = $vacancy['creator_name'];

    // 2. If creator is sub_admin2, notify all active sub_admin1 users of that company
    if ($vacancy['creator_role'] === 'sub_admin2') {
        $stmtSub1 = $db->prepare("SELECT email, full_name FROM admins WHERE role = 'sub_admin1' AND company_id = ? AND is_active = 1");
        $stmtSub1->execute([$vacancy['company_id']]);
        $sub1List = $stmtSub1->fetchAll();
        foreach ($sub1List as $sub1) {
            $recipients[$sub1['email']] = $sub1['full_name'];
        }
    }

    // 3. Always notify all active admin and super_admin users (Global Admins)
    $stmtAdmins = $db->prepare("SELECT email, full_name FROM admins WHERE role IN ('admin', 'super_admin') AND is_active = 1");
    $stmtAdmins->execute();
    $adminList = $stmtAdmins->fetchAll();
    foreach ($adminList as $adm) {
        $recipients[$adm['email']] = $adm['full_name'];
    }

    // Send emails to all gathered unique recipients
    foreach ($recipients as $email => $name) {
        $body = $buildApprovalBody($name, $email, $vacancy['creator_email'], $vacancy['creator_name']);
        queueEmail($email, $name, $subject, $body);
    }
}

/**
 * Handle all rejection notifications.
 * $mode = 'sub1_rejected'  → Sub Admin 1 rejected at pending_subadmin1 → email creator (Sub Admin 2) only
 * $mode = 'admin_rejected' → Admin rejected at pending_global → email creator (Sub Admin 2 or Sub Admin 1) AND Sub Admin 1 (if they are not the same)
 */
function notifyOnRejection($vacancyId, $mode, $reason)
{
    $db = getDB();

    $stmt = $db->prepare("
        SELECT v.id, v.title, v.reference_number, v.company_id, c.name AS company_name,
               creator.email AS creator_email, creator.full_name AS creator_name, creator.role AS creator_role,
               sub1.email AS sub1_email, sub1.full_name AS sub1_name
        FROM vacancies v
        JOIN companies c ON v.company_id = c.id
        JOIN admins creator ON v.created_by = creator.id
        LEFT JOIN admins sub1 ON sub1.role = 'sub_admin1' AND sub1.company_id = v.company_id AND sub1.is_active = 1
        WHERE v.id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();
    if (!$vacancy) return;

    $title       = $vacancy['title'];
    $refNumber   = $vacancy['reference_number'];
    $companyName = $vacancy['company_name'];
    $reasonHtml  = htmlspecialchars($reason);

    $buildRejectionBody = function($recipientName, $recipientRole, $portalUrl) use ($title, $refNumber, $companyName, $reasonHtml) {

        $isCreator = ($recipientRole === 'sub_admin2' || $recipientRole === 'sub_admin1');

        $roleLabel = $isCreator
            ? 'The vacancy requisition you submitted'
            : 'A vacancy requisition you approved (Sub Admin 1)';

        $btnLabel = $isCreator
            ? '&#9998;&nbsp; Edit &amp; Resubmit Requisition'
            : '&#128269;&nbsp; View Vacancy Pipeline';

        $step2Title = $isCreator ? 'Modify &amp; Refine Requisition' : 'Requisition Revision Initiated';
        $step2Desc = $isCreator
            ? 'Edit the requisition details in the portal to fix the issues mentioned in the reviewer feedback.'
            : 'The creator has been notified to edit and resubmit. You can track progress in the portal.';

        $infoRows = gsInfoRow('Position / Title', htmlspecialchars($title), '#fee2e2')
                  . gsInfoRow('Reference No.', "<span style='font-family:monospace;color:#b91c1c;font-weight:700;'>" . htmlspecialchars($refNumber) . "</span>", '#fee2e2')
                  . gsInfoRow('Company', htmlspecialchars($companyName), '#fee2e2')
                  . gsInfoRow('Status', gsStatusPill('Revision Required', 'rejected'), '#fee2e2');

        $contentHtml = "
          <!-- Greeting -->
          <p style='margin:0 0 8px;font-size:14px;color:#64748b;'>Dear <strong style='color:#1e293b;'>{$recipientName}</strong>,</p>

          <!-- Status Pill -->
          <div style='margin:16px 0 12px;'>
            <span style='display:inline-block;background-color:#fff5f5;color:#c53030;padding:5px 14px;border-radius:100px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;line-height:1.2;vertical-align:middle;border:1px solid #feb2b2;'>
              <span style='width:6px;height:6px;border-radius:50%;background-color:#e53e3e;display:inline-block;vertical-align:middle;margin-right:6px;margin-top:-2px;'></span>
              <span style='vertical-align:middle;'>Revision Required</span>
            </span>
          </div>

          <!-- Header -->
          <h2 style='margin:0 0 16px;font-size:22px;font-weight:800;color:#1e293b;letter-spacing:-0.5px;line-height:1.25;'>
            Vacancy Requisition Returned for Revision
          </h2>

          <p style='margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;'>
            {$roleLabel} has been reviewed and has been <strong>returned with feedback</strong> for revision.
          </p>

          <!-- Feedback Card -->
          <div style='background:linear-gradient(135deg, #fff5f5 0%, #fffbfb 100%);border:1px solid #feb2b2;border-left:4px solid #e53e3e;border-radius:10px;padding:20px;margin-bottom:28px;box-shadow:0 2px 4px rgba(229,62,62,0.03);'>
            <p style='margin:0 0 8px;font-size:11px;font-weight:800;color:#c53030;text-transform:uppercase;letter-spacing:0.8px;'>Reviewer Feedback &amp; Reason</p>
            <p style='margin:0;font-size:14px;color:#2d3748;font-weight:600;line-height:1.6;font-style:italic;'>
              &ldquo;{$reasonHtml}&rdquo;
            </p>
          </div>

          <!-- Info Card -->
          <div style='background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.02);'>
            <p style='margin:0 0 16px;font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;'>Requisition Details</p>
            <table width='100%' cellpadding='0' cellspacing='0'>
              {$infoRows}
            </table>
          </div>

          <!-- Next Steps -->
          <div style='background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:32px;'>
            <p style='margin:0 0 16px;font-size:11px;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.8px;'>How to Proceed</p>
            
            <table width='100%' cellpadding='0' cellspacing='0'>
              <tr>
                <td valign='top' style='width:28px;'>
                  <div style='width:20px;height:20px;border-radius:50%;background:#e2e8f0;color:#475569;font-size:11px;font-weight:700;text-align:center;line-height:20px;'>1</div>
                </td>
                <td valign='top' style='padding-bottom:16px;'>
                  <p style='margin:0 0 4px;font-size:13px;font-weight:700;color:#1e293b;'>Analyze Rejection Reason</p>
                  <p style='margin:0;font-size:12px;color:#64748b;line-height:1.4;'>Read the reviewer feedback above to check the required changes.</p>
                </td>
              </tr>
              <tr>
                <td valign='top' style='width:28px;'>
                  <div style='width:20px;height:20px;border-radius:50%;background:#e2e8f0;color:#475569;font-size:11px;font-weight:700;text-align:center;line-height:20px;'>2</div>
                </td>
                <td valign='top' style='padding-bottom:16px;'>
                  <p style='margin:0 0 4px;font-size:13px;font-weight:700;color:#1e293b;'>{$step2Title}</p>
                  <p style='margin:0;font-size:12px;color:#64748b;line-height:1.4;'>{$step2Desc}</p>
                </td>
              </tr>
              <tr>
                <td valign='top' style='width:28px;'>
                  <div style='width:20px;height:20px;border-radius:50%;background:#e53e3e;color:#ffffff;font-size:11px;font-weight:700;text-align:center;line-height:20px;'>3</div>
                </td>
                <td valign='top'>
                  <p style='margin:0 0 4px;font-size:13px;font-weight:700;color:#1e293b;'>Submit for Re-approval</p>
                  <p style='margin:0;font-size:12px;color:#64748b;line-height:1.4;'>Save and resubmit the vacancy requisition to put it back in the approval pipeline.</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- CTA Button -->
          <div style='text-align:center;margin-bottom:12px;'>
            " . gsButton($btnLabel, $portalUrl, 'crimson') . "
          </div>
        ";
        return gsEmailShell($contentHtml);
    };

    $subject = "Vacancy Requisition Rejected — {$refNumber}";

    // Always notify the creator (Sub Admin 2 or Sub Admin 1)
    $creatorPortalUrl = FRONTEND_URL . "/admin/vacancies?highlight={$vacancyId}";
    $creatorBody      = $buildRejectionBody($vacancy['creator_name'], $vacancy['creator_role'], $creatorPortalUrl);
    queueEmail($vacancy['creator_email'], $vacancy['creator_name'], $subject, $creatorBody);

    // If admin rejected (pending_global stage) and the creator was Sub Admin 2, also notify Sub Admin 1
    if ($mode === 'admin_rejected' && $vacancy['creator_role'] === 'sub_admin2' && !empty($vacancy['sub1_email']) && $vacancy['sub1_email'] !== $vacancy['creator_email']) {
        $sub1PortalUrl = FRONTEND_URL . "/admin/approvals?highlight={$vacancyId}";
        $sub1Body      = $buildRejectionBody($vacancy['sub1_name'], 'sub_admin1', $sub1PortalUrl);
        queueEmail($vacancy['sub1_email'], $vacancy['sub1_name'], $subject, $sub1Body);
    }
}

function getVacancyAuditLog()
{
    $auth = verifyToken();
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, 'Invalid vacancy ID');
    }

    $db = getDB();
    
    // If company scoped, verify company matches
    if ($auth['role'] === 'sub_admin1' || $auth['role'] === 'sub_admin2') {
        $stmt = $db->prepare("SELECT company_id FROM vacancies WHERE id = ?");
        $stmt->execute([$id]);
        $vac = $stmt->fetch();
        if (!$vac || (int)$vac['company_id'] !== (int)$auth['company_id']) {
            jsonResponse(403, 'Unauthorized to view audit logs for this vacancy');
        }
    }

    $stmt = $db->prepare("SELECT l.*, a.full_name as admin_name, a.role as admin_role 
                          FROM vacancy_audit_logs l 
                          JOIN admins a ON l.admin_id = a.id 
                          WHERE l.vacancy_id = ? 
                          ORDER BY l.created_at ASC, l.id ASC");
    $stmt->execute([$id]);
    $logs = $stmt->fetchAll();

    jsonResponse(200, 'Audit logs retrieved', $logs);
}

// Note: logVacancyAction() helper has been moved to backend/config.php for global availability.

function listAllAuditLogs()
{
    $auth = verifyToken();
    $role = $auth['role'];
    $companyId = $auth['company_id'] ?? null;
    $db = getDB();

    $sql = "SELECT l.*, a.full_name as admin_name, a.role as admin_role, 
                   v.title as vacancy_title, v.reference_number as vacancy_ref, c.name as company_name
            FROM vacancy_audit_logs l
            LEFT JOIN admins a ON l.admin_id = a.id
            JOIN vacancies v ON l.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id";
    $params = [];

    // Subsidiary admins can only see logs of their own company/subsidiary
    if ($role === 'sub_admin1' || $role === 'sub_admin2') {
        $sql .= " WHERE v.company_id = ?";
        $params[] = $companyId;
    }

    $sql .= " ORDER BY l.created_at DESC, l.id DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $logs = $stmt->fetchAll();

    jsonResponse(200, 'All audit logs retrieved', $logs);
}


