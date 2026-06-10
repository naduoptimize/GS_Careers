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
    $stmt = $db->prepare("INSERT INTO vacancies (company_id, reference_number, title, designation, description, requirements, location, employment_type, min_experience, min_relevant_experience, publish_date, expire_date, created_by, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
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
        $auth['admin_id'],
        $status
    ]);

    $newId = $db->lastInsertId();

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

    $stmt = $db->prepare("UPDATE vacancies SET company_id = ?, reference_number = ?, title = ?, designation = ?, description = ?, requirements = ?, location = ?, employment_type = ?, min_experience = ?, min_relevant_experience = ?, publish_date = ?, expire_date = ?, is_active = ?, approval_status = ?, rejection_reason = NULL, sub1_approved_by = ?, sub1_approved_at = ?, global_approved_by = ?, global_approved_at = ?, rejected_by = ?, rejected_at = ? WHERE id = ?");
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
        $status,
        $sub1_by,
        $sub1_at,
        $glob_by,
        $glob_at,
        $rej_by,
        $rej_at,
        $id
    ]);

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

    $stmt = $db->prepare("DELETE FROM vacancies WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(200, 'Vacancy deleted successfully');
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
        // They also see all approved/rejected/pending vacancies in the system
        $sql .= " WHERE v.approval_status IN ('draft', 'pending_subadmin1', 'pending_global', 'approved', 'rejected')";
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
        
        jsonResponse(200, 'Vacancy approved by Sub Admin 1 and forwarded to Global Admin', null, true);
        
        notifyReviewers($vacancyId, 'pending_global');

    } elseif ($role === 'super_admin' || $role === 'admin') {
        // Can approve pending_global across any company
        if ($vacancy['approval_status'] !== 'pending_global') {
            jsonResponse(400, 'Vacancy is not pending Global Admin approval');
        }
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'approved', rejection_reason = NULL, global_approved_by = ?, global_approved_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$auth['admin_id'], $vacancyId]);
        
        jsonResponse(200, 'Vacancy approved successfully and is now active/publishable', null, true);
        
        notifyCreator($vacancyId, 'approved');

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
        
        jsonResponse(200, 'Vacancy rejected successfully', null, true);
        
        notifyCreator($vacancyId, 'rejected', $reason);

    } elseif ($role === 'super_admin' || $role === 'admin') {
        // Can reject pending_global across any company
        if ($vacancy['approval_status'] !== 'pending_global') {
            jsonResponse(400, 'Vacancy is not in a state that can be rejected by Global Admin');
        }
        
        $stmtUpdate = $db->prepare("UPDATE vacancies SET approval_status = 'rejected', rejection_reason = ?, rejected_by = ?, rejected_at = NOW() WHERE id = ?");
        $stmtUpdate->execute([$reason, $auth['admin_id'], $vacancyId]);
        
        jsonResponse(200, 'Vacancy rejected successfully', null, true);
        
        notifyCreator($vacancyId, 'rejected', $reason);

    } else {
        jsonResponse(403, 'Your role does not have permission to reject vacancies');
    }
}

// ---- NOTIFICATION MAIL HELPERS ----

function notifyReviewers($vacancyId, $status)
{
    $db = getDB();
    
    // Fetch vacancy title and company name
    $stmt = $db->prepare("SELECT v.title, v.reference_number, c.name as company_name FROM vacancies v JOIN companies c ON v.company_id = c.id WHERE v.id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();
    if (!$vacancy) return;
    
    $title = $vacancy['title'];
    $refNumber = $vacancy['reference_number'];
    $companyName = $vacancy['company_name'];
    
    if ($status === 'pending_subadmin1') {
        $stmtAdmins = $db->prepare("SELECT email, full_name FROM admins WHERE role = 'sub_admin1' AND company_id = (SELECT company_id FROM vacancies WHERE id = ?) AND is_active = 1");
        $stmtAdmins->execute([$vacancyId]);
        $reviewers = $stmtAdmins->fetchAll();
        
        $subject = "Action Required: New Vacancy Requisition Pending Approval - $refNumber";
        $bodyHeader = "A new vacancy requisition has been submitted and requires your approval as <strong>Sub Admin 1</strong>.";
    } elseif ($status === 'pending_global') {
        $stmtAdmins = $db->prepare("SELECT email, full_name FROM admins WHERE role IN ('admin', 'super_admin') AND is_active = 1");
        $stmtAdmins->execute();
        $reviewers = $stmtAdmins->fetchAll();
        
        $subject = "Action Required: Vacancy Requisition Pending Global Approval - $refNumber";
        $bodyHeader = "A vacancy requisition has been approved by Sub Admin 1 and now requires your approval as <strong>Global Admin</strong>.";
    } else {
        return;
    }
    
    foreach ($reviewers as $reviewer) {
        $body = "
        <div style='font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;'>
            <div style='background-color: #2a050b; padding: 20px; text-align: center; color: white;'>
                <h2 style='margin: 0;'>George Steuart Careers</h2>
            </div>
            <div style='padding: 20px;'>
                <p>Dear {$reviewer['full_name']},</p>
                <p>{$bodyHeader}</p>
                <table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>
                    <tr>
                        <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Vacancy Title:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$title}</td>
                    </tr>
                    <tr>
                        <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Reference No:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$refNumber}</td>
                    </tr>
                    <tr>
                        <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Company:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$companyName}</td>
                    </tr>
                </table>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:3000/admin/approvals' style='padding: 12px 24px; background-color: #2a050b; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;'>Review Requisition</a>
                </div>
                <p style='font-size: 12px; color: #777;'>This is an automated system notification. Please do not reply directly to this email.</p>
            </div>
        </div>
        ";
        
        sendEmail($reviewer['email'], $reviewer['full_name'], $subject, $body);
    }
}

function notifyCreator($vacancyId, $action, $reason = '')
{
    $db = getDB();
    
    $stmt = $db->prepare("SELECT v.title, v.reference_number, c.name as company_name, a.email, a.full_name 
                          FROM vacancies v 
                          JOIN companies c ON v.company_id = c.id 
                          JOIN admins a ON v.created_by = a.id 
                          WHERE v.id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();
    if (!$vacancy) return;
    
    $title = $vacancy['title'];
    $refNumber = $vacancy['reference_number'];
    $companyName = $vacancy['company_name'];
    $creatorEmail = $vacancy['email'];
    $creatorName = $vacancy['full_name'];
    
    if ($action === 'approved') {
        $subject = "Vacancy Requisition Approved and Published - $refNumber";
        $statusMessage = "<span style='color: green; font-weight: bold;'>APPROVED and is now LIVE</span>.";
        $additionalContent = "<p>Candidates can now view and apply for this vacancy on the public job board.</p>";
    } elseif ($action === 'rejected') {
        $subject = "Vacancy Requisition Rejected - $refNumber";
        $statusMessage = "<span style='color: red; font-weight: bold;'>REJECTED</span>.";
        $additionalContent = "
        <p><strong>Reason for Rejection:</strong></p>
        <blockquote style='background: #f9f9f9; border-left: 5px solid #2a050b; padding: 10px; margin: 15px 0; font-style: italic;'>
            " . htmlspecialchars($reason) . "
        </blockquote>
        <p>You can login to the admin portal, make the necessary corrections, and resubmit it for approval.</p>";
    } else {
        return;
    }
    
    $body = "
    <div style='font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;'>
        <div style='background-color: #2a050b; padding: 20px; text-align: center; color: white;'>
            <h2 style='margin: 0;'>George Steuart Careers</h2>
        </div>
        <div style='padding: 20px;'>
            <p>Dear {$creatorName},</p>
            <p>Your vacancy requisition for <strong>{$title}</strong> has been {$statusMessage}</p>
            <table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;'>Vacancy Title:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$title}</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Reference No:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$refNumber}</td>
                </tr>
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;'>Company:</td>
                    <td style='padding: 8px; border-bottom: 1px solid #eee;'>{$companyName}</td>
                </tr>
            </table>
            {$additionalContent}
            <div style='text-align: center; margin: 30px 0;'>
                <a href='http://localhost:3000/admin/vacancies' style='padding: 12px 24px; background-color: #2a050b; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;'>Go to Vacancies</a>
            </div>
            <p style='font-size: 12px; color: #777;'>This is an automated system notification. Please do not reply directly to this email.</p>
        </div>
    </div>
    ";
    
    sendEmail($creatorEmail, $creatorName, $subject, $body);
}


