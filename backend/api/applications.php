<?php
ob_start();
set_time_limit(60);
// ============================================
// Applications API
// ============================================
require_once __DIR__ . '/../config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'apply':
        handleApply();
        break;
    case 'list':
        listApplications();
        break;
    case 'export':
        exportApplications();
        break;
    case 'stats':
        getStats();
        break;
    case 'update_status':
        handleUpdateStatus();
        break;
    case 'send_interview':
        handleSendInterview();
        break;
    case 'get_suggestions':
        handleGetSuggestions();
        break;
    case 'get_candidate_count':
        handleGetCandidateCount();
        break;
    case 'get_matching_candidates':
        handleGetMatchingCandidates();
        break;
    case 'get_talent_pool':
        handleGetTalentPool();
        break;
    case 'update_candidate_tags':
        handleUpdateCandidateTags();
        break;
    case 'view_cv':
        handleViewCV();
        break;
    case 'delete':
        handleDeleteApplication();
        break;
    case 'bulk_delete':
        handleBulkDeleteApplications();
        break;
    case 'block_candidate':
        handleBlockCandidate();
        break;
    case 'unblock_candidate':
        handleUnblockCandidate();
        break;
    default:
        jsonResponse(400, 'Invalid action');
}

function handleApply()
{
    // Read form data (multipart/form-data for file upload)
    $firstName = sanitize($_POST['first_name'] ?? '');
    $lastName = sanitize($_POST['last_name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $contactNumber = sanitize($_POST['contact_number'] ?? '');
    $overallExp = $_POST['overall_experience'] ?? '';
    $relevantExp = $_POST['relevant_experience'] ?? '';
    $qualification = $_POST['qualification'] ?? '';
    $salaryExpectation = sanitize($_POST['salary_expectation'] ?? '');
    $vacancyId = (int) ($_POST['vacancy_id'] ?? 0);
    $futureConsent = isset($_POST['future_consent']) && ($_POST['future_consent'] === 'true' || $_POST['future_consent'] === '1') ? 1 : 0;

    // Validate required fields
    if (
        empty($firstName) || empty($lastName) || empty($email) || empty($contactNumber) ||
        empty($overallExp) || empty($relevantExp) || empty($qualification) || $vacancyId <= 0
    ) {
        jsonResponse(400, 'All fields are required');
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, 'Invalid email address');
    }

    // Validate CV file
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(400, 'CV file is required');
    }

    $cv = $_FILES['cv'];
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!in_array($cv['type'], $allowedTypes)) {
        jsonResponse(400, 'Only PDF, DOC, and DOCX files are allowed');
    }

    if ($cv['size'] > MAX_CV_SIZE) {
        jsonResponse(400, 'CV file must be less than 5MB');
    }

    $db = getDB();

    // Check if vacancy exists and is active
    $stmt = $db->prepare("SELECT v.*, c.name as company_name FROM vacancies v JOIN companies c ON v.company_id = c.id WHERE v.id = ? AND v.is_active = 1 AND v.expire_date >= CURDATE()");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();

    if (!$vacancy) {
        jsonResponse(404, 'Vacancy not found or has expired');
    }

    // Check duplicate email for same vacancy
    $stmt = $db->prepare("SELECT id FROM applications WHERE email = ? AND vacancy_id = ?");
    $stmt->execute([$email, $vacancyId]);
    if ($stmt->fetch()) {
        jsonResponse(409, 'You have already applied for this position with this email');
    }

    // Check duplicate contact number for same vacancy
    $stmt = $db->prepare("SELECT id FROM applications WHERE contact_number = ? AND vacancy_id = ?");
    $stmt->execute([$contactNumber, $vacancyId]);
    if ($stmt->fetch()) {
        jsonResponse(409, 'You have already applied for this position with this contact number');
    }

    // Save CV file
    $ext = pathinfo($cv['name'], PATHINFO_EXTENSION);
    $cvFileName = 'cv_' . $vacancyId . '_' . time() . '_' . uniqid() . '.' . $ext;
    $cvPath = UPLOAD_DIR . $cvFileName;

    if (!move_uploaded_file($cv['tmp_name'], $cvPath)) {
        jsonResponse(500, 'Failed to upload CV');
    }

    // Check if email is already blocked
    $stmt = $db->prepare("SELECT is_blocked, block_reason FROM applications WHERE email = ? AND is_blocked = 1 LIMIT 1");
    $stmt->execute([$email]);
    $blockInfo = $stmt->fetch();
    $isBlocked = $blockInfo ? 1 : 0;
    $blockReason = $blockInfo ? $blockInfo['block_reason'] : null;

    // Insert application
    $stmt = $db->prepare("INSERT INTO applications (vacancy_id, first_name, last_name, email, contact_number, overall_experience, relevant_experience, qualification, salary_expectation, cv_path, future_consent, is_blocked, block_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $vacancyId,
        $firstName,
        $lastName,
        $email,
        $contactNumber,
        $overallExp,
        $relevantExp,
        $qualification,
        $salaryExpectation,
        $cvFileName,
        $futureConsent,
        $isBlocked,
        $blockReason
    ]);

    // Return response immediately to frontend so it can redirect
    jsonResponse(201, 'Application submitted successfully! A confirmation email is being sent.', null, true);

    // Continue sending email in background
    sendConfirmationEmail($email, $firstName, $vacancy['title'], $vacancy['company_name'], $vacancy['reference_number']);
    exit();
}

function sendConfirmationEmail($to, $name, $jobTitle, $companyName, $jobRef)
{
    if (!defined('EMAIL_ENABLED') || !EMAIL_ENABLED)
        return;

    $mail = new PHPMailer(true);

    try {
        // Server settings
        if (defined('SMTP_DEBUG')) {
            $mail->SMTPDebug = SMTP_DEBUG;
            $mail->Debugoutput = function ($str, $level) {
                error_log("SMTP DEBUG (Confirmation): $str");
            };
        }
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = (SMTP_SECURE === 'tls') ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = SMTP_PORT;
        $mail->Timeout = 15; // 15 second timeout to prevent hanging
        $mail->SMTPKeepAlive = false;

        // SSL Bypass for local environments
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Recipients
        $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
        $mail->addAddress($to, $name);
        $mail->addReplyTo(SMTP_REPLY_TO, SMTP_FROM_NAME);

        // Content
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = "Application Received - $jobTitle | George Steuart Group";
        $currentYear = date('Y');

        // Premium HTML Template
        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
                .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
                .header img { height: 60px; margin-bottom: 15px; }
                .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
                .header p { color: #c8a951; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
                .content { padding: 40px 35px; }
                .greeting { font-size: 20px; color: #1a1a2e; margin-bottom: 24px; font-weight: 700; }
                .success-badge { display: inline-block; background-color: #f0fdf4; color: #166534; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; border: 1px solid #dcfce7; }
                .info-card { background-color: #fdfaf3; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #c8a951; }
                .info-row { margin-bottom: 12px; }
                .info-row:last-child { margin-bottom: 0; }
                .info-label { color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px; }
                .info-value { color: #1a1a2e; font-size: 15px; font-weight: 600; }
                .next-steps { background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-top: 30px; }
                .next-steps h3 { margin-top: 0; font-size: 16px; color: #1a1a2e; }
                .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #ffffff; }
                .footer-divider { border: 0; border-top: 1px solid #f1f5f9; margin: 0 35px; }
            </style>
        </head>
        <body>
            <div class='wrapper'>
                <div class='container'>
                    <div class='header'>
                        <h1>GEORGE STEUART</h1>
                        <p>ESTABLISHED 1835</p>
                    </div>
                    <div class='content'>
                        <div class='greeting'>Hello $name,</div>
                        <div class='success-badge'>✓ Application Received Successfully</div>
                        <p>Thank you for your interest in joining <strong>George Steuart Group</strong>. We have successfully received your application and it is now being reviewed by our Talent Acquisition team.</p>
                        
                        <div class='info-card'>
                            <div class='info-row'>
                                <div class='info-label'>Position</div>
                                <div class='info-value'>$jobTitle</div>
                            </div>
                            <div class='info-row'>
                                <div class='info-label'>Job Reference No</div>
                                <div class='info-value'>$jobRef</div>
                            </div>
                            <div class='info-row'>
                                <div class='info-label'>Entity</div>
                                <div class='info-value'>$companyName</div>
                            </div>
                        </div>
 
                        <div class='next-steps'>
                            <h3>What's next?</h3>
                            <p style='margin-bottom: 0; font-size: 14px;'>Our team will evaluate your profile against the role requirements. If your experience aligns with our needs, we will reach out to you directly for the next steps in the selection process.</p>
                        </div>
                        
                        <p style='margin-top: 30px;'>Best regards,<br>
                        <strong style='color: #1a1a2e;'>Talent Acquisition Team</strong><br>
                        George Steuart Group</p>
                    </div>
                    <hr class='footer-divider'>
                    <div class='footer'>
                        &copy; $currentYear George Steuart Group. All Rights Reserved.<br>
                        No. 439, Galle Road, Colombo 03, Sri Lanka.<br>
                        <p style='font-size: 10px; margin-top: 15px;'>This is an automated system notification. Please do not reply to this email.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>";

        $mail->send();
    } catch (Exception $e) {
        error_log("PHPMailer Error (Confirmation): " . $mail->ErrorInfo);
    }
}

function sendShortlistEmail($to, $name, $jobTitle, $companyName, $jobRef, $type, $date, $time, $location, $locationLink = '')
{
    if (!defined('EMAIL_ENABLED') || !EMAIL_ENABLED)
        return;

    $mail = new PHPMailer(true);

    try {
        if (defined('SMTP_DEBUG')) {
            $mail->SMTPDebug = SMTP_DEBUG;
            $mail->Debugoutput = function ($str, $level) {
                error_log("SMTP DEBUG (Shortlist): $str");
            };
        }
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = (SMTP_SECURE === 'tls') ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = SMTP_PORT;
        $mail->Timeout = 15;
        $mail->SMTPKeepAlive = false;
        $mail->CharSet = 'UTF-8';

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
        $mail->addAddress($to, $name);
        $mail->addReplyTo(SMTP_REPLY_TO, SMTP_FROM_NAME);

        $mail->isHTML(true);
        $mail->Subject = "Interview Invitation - $jobTitle | George Steuart Group";
        $currentYear = date('Y');

        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f0f4f8; }
                .wrapper { width: 100%; table-layout: fixed; background-color: #f0f4f8; padding-bottom: 40px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
                .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
                .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
                .header p { color: #c8a951; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
                .content { padding: 40px 35px; }
                .greeting { font-size: 22px; color: #1a1a2e; margin-bottom: 20px; font-weight: 700; }
                .status-line { color: #8b1a2b; font-weight: 700; font-size: 18px; margin-bottom: 20px; }
                .details-box { background-color: #fffaf0; border-radius: 12px; padding: 30px; margin: 25px 0; border: 1px solid #fbd38d; }
                .details-title { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #fbd38d; padding-bottom: 10px; }
                .detail-item { margin-bottom: 15px; display: flex; align-items: baseline; }
                .detail-label { font-weight: 700; color: #718096; width: 130px; font-size: 12px; text-transform: uppercase; }
                .detail-value { font-weight: 600; color: #2d3748; flex: 1; font-size: 15px; }
                .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
            </style>
        </head>
        <body>
            <div class='wrapper'>
                <div class='container'>
                    <div class='header'>
                        <h1>GEORGE STEUART</h1>
                        <p>ESTABLISHED 1835</p>
                    </div>
                    <div class='content'>
                        <div class='greeting'>Dear $name,</div>
                        <p>We are pleased to inform you that after reviewing your application for the position of <strong>$jobTitle</strong> (Ref: $jobRef), you have been <span style='color: #c8a951; font-weight: 800;'>SHORTLISTED</span> for the next stage of our selection process.</p>
                        
                        <div class='details-box'>
                            <div class='details-title'>Interview Details</div>
                            <div class='detail-item'>
                                <div class='detail-label'>Type</div>
                                <div class='detail-value'>$type</div>
                            </div>
                            <div class='detail-item'>
                                <div class='detail-label'>Date</div>
                                <div class='detail-value'>$date</div>
                            </div>
                            <div class='detail-item'>
                                <div class='detail-label'>Time</div>
                                <div class='detail-value'>$time</div>
                            </div>
                            <div class='detail-item'>
                                <div class='detail-label'>Location</div>
                                <div class='detail-value'>" . ($type === 'Online' ? 'Virtual / Online' : $location) . "</div>
                            </div>
                            " . (!empty($locationLink) || $type === 'Online' ? "
                            <div class='detail-item'>
                                <div class='detail-label'>" . ($type === 'Online' ? 'Meeting Link' : 'Map Link') . "</div>
                                <div class='detail-value'>
                                    <a href='" . ($type === 'Online' ? $location : $locationLink) . "' style='color: #c8a951; text-decoration: underline; font-weight: 700;'>
                                        " . ($type === 'Online' ? 'Join Meeting' : 'View on Map') . "
                                    </a>
                                </div>
                            </div>" : "") . "
                        </div>

                        <p>Please confirm your availability by replying to this email. We look forward to discussing your potential contribution to George Steuart Group.</p>

                        <p style='margin-top: 30px;'>Best regards,<br>
                        <strong style='color: #1a1a2e;'>Talent Acquisition Team</strong><br>
                        George Steuart Group</p>
                    </div>
                    <div class='footer'>
                        &copy; $currentYear George Steuart Group. All Rights Reserved.<br>
                        No. 439, Galle Road, Colombo 03, Sri Lanka.<br>
                        <p style='font-size: 10px; margin-top: 10px;'>This is an automated notification.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>";
        $mail->send();
    } catch (Exception $e) {
        error_log("PHPMailer Error (Shortlist): " . $mail->ErrorInfo);
    }
}

function sendRejectionEmail($to, $name, $jobTitle, $companyName, $reason, $jobRef)
{
    if (!defined('EMAIL_ENABLED') || !EMAIL_ENABLED)
        return;

    $mail = new PHPMailer(true);

    try {
        if (defined('SMTP_DEBUG')) {
            $mail->SMTPDebug = SMTP_DEBUG;
            $mail->Debugoutput = function ($str, $level) {
                error_log("SMTP DEBUG (Rejection): $str");
            };
        }
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = (SMTP_SECURE === 'tls') ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = SMTP_PORT;
        $mail->Timeout = 15;
        $mail->SMTPKeepAlive = false;

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
        $mail->addAddress($to, $name);
        $mail->addReplyTo(SMTP_REPLY_TO, SMTP_FROM_NAME);

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = "Application Status Update - $jobTitle | George Steuart Group";
        $currentYear = date('Y');

        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; margin: 0; padding: 0; background-color: #f8fafc; }
                .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
                .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 4px solid #ef4444; }
                .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
                .header p { color: #ef4444; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
                .content { padding: 40px 35px; }
                .greeting { font-size: 20px; color: #1a1a2e; margin-bottom: 24px; font-weight: 700; }
                .info-bar { background-color: #f1f5f9; padding: 12px 20px; border-radius: 8px; font-size: 13px; color: #64748b; margin-bottom: 25px; }
                .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
            </style>
        </head>
        <body>
            <div class='wrapper'>
                <div class='container'>
                    <div class='header'>
                        <h1>GEORGE STEUART</h1>
                        <p>ESTABLISHED 1835</p>
                    </div>
                    <div class='content'>
                        <div class='greeting'>Dear $name,</div>
                        <div class='info-bar'>Position: $jobTitle | Ref: $jobRef</div>
                        <p>Thank you for the time and effort you invested in applying for the position of <strong>$jobTitle</strong> at <strong>$companyName</strong>.</p>
                        
                        <p>After a thorough review of all applications, we regret to inform you that we will not be moving forward with your candidacy at this time. Our team received a significant number of competitive applications, making our selection process extremely competitive.</p>
                        
                        <p>We truly appreciate your interest in George Steuart Group and encourage you to apply for other positions that align with your expertise in the future.</p>
                        
                        <p>We wish you the very best in your professional endeavors.</p>
                        
                        <p style='margin-top: 30px;'>Sincerely,<br>
                        <strong style='color: #1a1a2e;'>Talent Acquisition Team</strong><br>
                        George Steuart Group</p>
                    </div>
                    <div class='footer'>
                        &copy; $currentYear George Steuart Group. All Rights Reserved.<br>
                        No. 439, Galle Road, Colombo 03, Sri Lanka.<br>
                    </div>
                </div>
            </div>
        </body>
        </html>";

        $mail->send();
    } catch (Exception $e) {
        error_log("PHPMailer Error (Rejection): " . $mail->ErrorInfo);
    }
}


/**
 * Returns an ordered array of experience tiers.
 */
function getAllExperienceTiers()
{
    return [
        '0 years',
        '0-1 years',
        '1-2 years',
        '3-4 years',
        '5-7 years',
        '8-10 years',
        '10+ years',
    ];
}

/**
 * Returns all experience tiers >= the given level.
 * E.g. getExperienceAtLeast('3-4 years') => ['3-4 years','5-7 years','8-10 years','10+ years']
 */
function getExperienceAtLeast($level)
{
    $tiers = getAllExperienceTiers();
    $idx = array_search($level, $tiers);
    if ($idx === false)
        return $tiers; // if unknown, return all
    return array_slice($tiers, $idx);
}

function listApplications()
{
    $auth = verifyToken();
    $db = getDB();

    $vacancyId = $_GET['vacancy_id'] ?? '';
    $companyId = $_GET['company_id'] ?? '';
    $overallExp = $_GET['overall_experience'] ?? '';
    $relevantExp = $_GET['relevant_experience'] ?? '';
    $qualification = $_GET['qualification'] ?? '';
    $search = $_GET['search'] ?? '';
    $status = $_GET['status'] ?? '';

    $sql = "SELECT a.*, v.title as vacancy_title, v.reference_number as job_ref, v.designation, c.name as company_name, v.company_id, a.future_consent,
            (SELECT COUNT(*) > 0 FROM applications a2 WHERE a2.email = a.email AND a2.is_blocked = 1 LIMIT 1) as is_email_blocked
            FROM applications a
            JOIN vacancies v ON a.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id
            WHERE 1=1";
    $params = [];

    // Company scoped admin restriction
    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    if (!empty($vacancyId)) {
        $sql .= " AND a.vacancy_id = ?";
        $params[] = $vacancyId;
    }

    if (!empty($companyId) && $auth['role'] === 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    if (!empty($overallExp)) {
        // "At least" logic: show all tiers >= selected
        $overallTiers = getExperienceAtLeast($overallExp);
        $placeholders = implode(',', array_fill(0, count($overallTiers), '?'));
        $sql .= " AND a.overall_experience IN ($placeholders)";
        $params = array_merge($params, $overallTiers);
    }

    if (!empty($relevantExp)) {
        // "At least" logic: show all tiers >= selected
        $relTiers = getExperienceAtLeast($relevantExp);
        $placeholders = implode(',', array_fill(0, count($relTiers), '?'));
        $sql .= " AND a.relevant_experience IN ($placeholders)";
        $params = array_merge($params, $relTiers);
    }

    if (!empty($qualification)) {
        $sql .= " AND a.qualification = ?";
        $params[] = $qualification;
    }

    if (!empty($status)) {
        $sql .= " AND a.status = ?";
        $params[] = $status;
    }

    $interviewDate = sanitize($_GET['interview_date'] ?? '');
    if (!empty($interviewDate)) {
        $sql .= " AND a.interview_date = ?";
        $params[] = $interviewDate;
    }

    if (!empty($search)) {
        $sql .= " AND (a.first_name LIKE ? OR a.last_name LIKE ? OR a.email LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $sql .= " ORDER BY a.applied_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $applications = $stmt->fetchAll();

    jsonResponse(200, 'Applications retrieved', $applications);
}

function handleUpdateStatus()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to modify application status');
    }
    $db = getDB();

    $data = json_decode(file_get_contents('php://input'), true);
    $applicationId = (int) ($data['id'] ?? 0);
    $newStatus = sanitize($data['status'] ?? '');
    $rejectionReason = sanitize($data['rejection_reason'] ?? '');

    if ($applicationId <= 0 || !in_array($newStatus, ['pending', 'under_review', 'shortlisted', 'rejected'])) {
        jsonResponse(400, 'Invalid request data');
    }

    if ($newStatus === 'rejected' && empty($rejectionReason)) {
        jsonResponse(400, 'Rejection reason is required');
    }

    // Check permissions map correctly
    $stmt = $db->prepare("SELECT a.*, v.title as vacancy_title, v.reference_number as job_ref, c.name as company_name, v.company_id
                          FROM applications a 
                          JOIN vacancies v ON a.vacancy_id = v.id 
                          JOIN companies c ON v.company_id = c.id
                          WHERE a.id = ?");
    $stmt->execute([$applicationId]);
    $application = $stmt->fetch();

    if (!$application) {
        jsonResponse(404, 'Application not found');
    }

    if ($auth['role'] !== 'super_admin' && $application['company_id'] != $auth['company_id']) {
        jsonResponse(403, 'Unauthorized access to this application');
    }

    $currentStatus = $application['status'];
    // Allow re-marking pending/under_review; block only if already rejected
    if ($currentStatus === 'rejected') {
        jsonResponse(400, 'Application has already been rejected');
    }
    // Allow shortlisting an already-shortlisted candidate (e.g. going back to review)
    // but block under_review -> under_review duplicate
    if ($currentStatus === 'under_review' && $newStatus === 'under_review') {
        jsonResponse(400, 'Application is already under review');
    }

    $reasonToSave = ($newStatus === 'rejected') ? $rejectionReason : null;

    if ($newStatus === 'shortlisted') {
        // Step 1: Only update status — NO interview details, NO email
        $stmt = $db->prepare("UPDATE applications SET status = 'shortlisted' WHERE id = ?");
        $success = $stmt->execute([$applicationId]);
    } else {
        $stmt = $db->prepare("UPDATE applications SET status = ?, rejection_reason = ? WHERE id = ?");
        $success = $stmt->execute([$newStatus, $reasonToSave, $applicationId]);
    }

    if (!$success) {
        jsonResponse(500, 'Failed to update status');
    }

    // Return response immediately
    jsonResponse(200, 'Application status updated successfully', null, true);

    // Only send rejection email here; interview email is sent via send_interview action
    if ($newStatus === 'rejected') {
        sendRejectionEmail($application['email'], $application['first_name'], $application['vacancy_title'], $application['company_name'], $reasonToSave, $application['job_ref']);
    }
    exit();
}

/**
 * Step 2: Save interview details and send interview invitation email.
 * Works on already-shortlisted candidates. Can be called multiple times (re-send).
 */
function handleSendInterview()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to schedule interviews');
    }
    $db = getDB();

    $data = json_decode(file_get_contents('php://input'), true);
    $applicationId = (int) ($data['id'] ?? 0);

    if ($applicationId <= 0) {
        jsonResponse(400, 'Invalid application ID');
    }

    $interviewType = sanitize($data['interview_type'] ?? 'Online');
    $interviewDate = sanitize($data['interview_date'] ?? '');
    $interviewTime = sanitize($data['interview_time'] ?? '');
    $interviewLocation = sanitize($data['interview_location'] ?? '');
    $interviewLocationLink = sanitize($data['interview_location_link'] ?? '');

    if (empty($interviewDate) || empty($interviewTime) || empty($interviewLocation)) {
        jsonResponse(400, 'Interview date, time, and location are required');
    }

    // Fetch application
    $stmt = $db->prepare("SELECT a.*, v.title as vacancy_title, v.reference_number as job_ref, c.name as company_name, v.company_id
                          FROM applications a
                          JOIN vacancies v ON a.vacancy_id = v.id
                          JOIN companies c ON v.company_id = c.id
                          WHERE a.id = ?");
    $stmt->execute([$applicationId]);
    $application = $stmt->fetch();

    if (!$application) {
        jsonResponse(404, 'Application not found');
    }

    if ($auth['role'] !== 'super_admin' && $application['company_id'] != $auth['company_id']) {
        jsonResponse(403, 'Unauthorized');
    }

    if ($application['status'] !== 'shortlisted') {
        jsonResponse(400, 'Candidate must be shortlisted before sending an interview invitation');
    }

    // Save interview details
    $stmt = $db->prepare("UPDATE applications SET interview_type = ?, interview_date = ?, interview_time = ?, interview_location = ?, interview_location_link = ? WHERE id = ?");
    $stmt->execute([$interviewType, $interviewDate, $interviewTime, $interviewLocation, $interviewLocationLink, $applicationId]);

    // Return immediately, then send email
    jsonResponse(200, 'Interview invitation sent successfully', null, true);

    sendShortlistEmail(
        $application['email'],
        $application['first_name'],
        $application['vacancy_title'],
        $application['company_name'],
        $application['job_ref'],
        $interviewType,
        $interviewDate,
        $interviewTime,
        $interviewLocation,
        $interviewLocationLink
    );
    exit();
}

function exportApplications()
{
    $auth = verifyToken();
    $db = getDB();

    $vacancyId = $_GET['vacancy_id'] ?? '';
    $companyId = $_GET['company_id'] ?? '';
    $overallExp = $_GET['overall_experience'] ?? '';
    $relevantExp = $_GET['relevant_experience'] ?? '';
    $qualification = $_GET['qualification'] ?? '';
    $status = $_GET['status'] ?? '';

    $sql = "SELECT a.first_name, a.last_name, a.email, a.contact_number, 
            a.overall_experience, a.relevant_experience, a.qualification, 
            a.salary_expectation, a.applied_at, a.status, a.rejection_reason,
            v.title as vacancy_title, v.reference_number as job_ref, v.designation, c.name as company_name
            FROM applications a
            JOIN vacancies v ON a.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id
            WHERE 1=1";
    $params = [];

    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    if (!empty($vacancyId)) {
        $sql .= " AND a.vacancy_id = ?";
        $params[] = $vacancyId;
    }

    if (!empty($companyId) && $auth['role'] === 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    if (!empty($overallExp)) {
        $overallTiers = getExperienceAtLeast($overallExp);
        $placeholders = implode(',', array_fill(0, count($overallTiers), '?'));
        $sql .= " AND a.overall_experience IN ($placeholders)";
        $params = array_merge($params, $overallTiers);
    }

    if (!empty($relevantExp)) {
        $relTiers = getExperienceAtLeast($relevantExp);
        $placeholders = implode(',', array_fill(0, count($relTiers), '?'));
        $sql .= " AND a.relevant_experience IN ($placeholders)";
        $params = array_merge($params, $relTiers);
    }

    if (!empty($qualification)) {
        $sql .= " AND a.qualification = ?";
        $params[] = $qualification;
    }

    if (!empty($status)) {
        $sql .= " AND a.status = ?";
        $params[] = $status;
    }

    $sql .= " ORDER BY a.applied_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $applications = $stmt->fetchAll();

    // Generate CSV (lightweight, no library needed)
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="applicants_' . date('Y-m-d_H-i-s') . '.csv"');
    header('Access-Control-Expose-Headers: Content-Disposition');

    // Remove JSON content type
    header_remove('Content-Type');
    header('Content-Type: text/csv; charset=UTF-8');

    $output = fopen('php://output', 'w');

    // BOM for Excel UTF-8
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    // Header row
    fputcsv($output, ['First Name', 'Last Name', 'Email', 'Contact Number', 'Overall Experience', 'Relevant Experience', 'Qualification', 'Salary Expectation', 'Applied Date', 'Vacancy', 'Designation', 'Company', 'Status', 'Rejection Reason']);

    foreach ($applications as $app) {
        fputcsv($output, [
            $app['first_name'],
            $app['last_name'],
            $app['email'],
            $app['contact_number'],
            $app['overall_experience'],
            $app['relevant_experience'],
            $app['qualification'],
            $app['salary_expectation'],
            $app['applied_at'],
            $app['vacancy_title'],
            $app['designation'],
            $app['company_name'],
            $app['status'] ?? 'pending',
            $app['rejection_reason'] ?? ''
        ]);
    }

    fclose($output);
    exit();
}

function getStats()
{
    $auth = verifyToken();
    $db = getDB();

    $interval = "INTERVAL 1 YEAR";

    if ($auth['role'] === 'super_admin') {
        $totalVacancies = $db->query("SELECT COUNT(*) FROM vacancies")->fetchColumn();
        $activeVacancies = $db->query("SELECT COUNT(*) FROM vacancies WHERE is_active = 1 AND expire_date >= CURDATE()")->fetchColumn();
        $totalApplications = $db->query("SELECT COUNT(*) FROM applications")->fetchColumn();
        $totalCompanies = $db->query("SELECT COUNT(*) FROM companies")->fetchColumn();

        // Talent Pool: Unique emails with future_consent = 1 within 1 year
        $talentPoolCount = $db->query("SELECT COUNT(DISTINCT email) FROM applications WHERE future_consent = 1 AND applied_at >= DATE_SUB(NOW(), $interval)")->fetchColumn();

        // Total Matches: Candidates in pool matching ANY active vacancy designation
        $totalMatches = $db->query("SELECT COUNT(DISTINCT a.email) 
                                   FROM applications a 
                                   JOIN vacancies v_pool ON a.vacancy_id = v_pool.id
                                   WHERE a.future_consent = 1 
                                     AND a.applied_at >= DATE_SUB(NOW(), $interval)
                                     AND v_pool.designation IN (SELECT designation FROM vacancies WHERE is_active = 1 AND expire_date >= CURDATE())")->fetchColumn();
    } else {
        $cid = $auth['company_id'];
        $stmt = $db->prepare("SELECT COUNT(*) FROM vacancies WHERE company_id = ?");
        $stmt->execute([$cid]);
        $totalVacancies = $stmt->fetchColumn();

        $stmt = $db->prepare("SELECT COUNT(*) FROM vacancies WHERE company_id = ? AND is_active = 1 AND expire_date >= CURDATE()");
        $stmt->execute([$cid]);
        $activeVacancies = $stmt->fetchColumn();

        $stmt = $db->prepare("SELECT COUNT(*) FROM applications a JOIN vacancies v ON a.vacancy_id = v.id WHERE v.company_id = ?");
        $stmt->execute([$cid]);
        $totalApplications = $stmt->fetchColumn();

        $totalCompanies = 1;

        // Talent Pool for specific company
        $stmt = $db->prepare("SELECT COUNT(DISTINCT a.email) FROM applications a JOIN vacancies v ON a.vacancy_id = v.id WHERE a.future_consent = 1 AND v.company_id = ? AND a.applied_at >= DATE_SUB(NOW(), $interval)");
        $stmt->execute([$cid]);
        $talentPoolCount = $stmt->fetchColumn();

        // Total Matches for company active vacancies
        $stmt = $db->prepare("SELECT COUNT(DISTINCT a.email) 
                             FROM applications a 
                             JOIN vacancies v_pool ON a.vacancy_id = v_pool.id
                             WHERE a.future_consent = 1 
                               AND v_pool.company_id = ?
                               AND a.applied_at >= DATE_SUB(NOW(), $interval)
                               AND v_pool.designation IN (SELECT designation FROM vacancies WHERE company_id = ? AND is_active = 1 AND expire_date >= CURDATE())");
        $stmt->execute([$cid, $cid]);
        $totalMatches = $stmt->fetchColumn();
    }

    // Recent Applications Feature for Dashboard
    $recentApps = [];
    if ($auth['role'] === 'super_admin') {
        $recentApps = $db->query("SELECT a.first_name, a.last_name, a.applied_at, v.title as vacancy_title 
                                 FROM applications a 
                                 JOIN vacancies v ON a.vacancy_id = v.id 
                                 ORDER BY a.applied_at DESC LIMIT 5")->fetchAll();
    } else {
        $stmt = $db->prepare("SELECT a.first_name, a.last_name, a.applied_at, v.title as vacancy_title 
                             FROM applications a 
                             JOIN vacancies v ON a.vacancy_id = v.id 
                             WHERE v.company_id = ? 
                             ORDER BY a.applied_at DESC LIMIT 5");
        $stmt->execute([$cid]);
        $recentApps = $stmt->fetchAll();
    }

    // Upcoming Interviews
    $upcomingInterviews = [];
    $today = date('Y-m-d');

    if ($auth['role'] === 'super_admin') {
        $upcomingInterviews = $db->query("SELECT a.id, a.first_name, a.last_name, a.interview_date, a.interview_time, a.interview_type, v.title as vacancy_title 
                                 FROM applications a 
                                 JOIN vacancies v ON a.vacancy_id = v.id 
                                 WHERE a.status = 'shortlisted' AND a.interview_date >= '$today'
                                 ORDER BY a.interview_date ASC, a.interview_time ASC 
                                 LIMIT 5")->fetchAll();
    } else {
        $stmt = $db->prepare("SELECT a.id, a.first_name, a.last_name, a.interview_date, a.interview_time, a.interview_type, v.title as vacancy_title 
                             FROM applications a 
                             JOIN vacancies v ON a.vacancy_id = v.id 
                             WHERE v.company_id = ? AND a.status = 'shortlisted' AND a.interview_date >= ?
                             ORDER BY a.interview_date ASC, a.interview_time ASC 
                             LIMIT 5");
        $stmt->execute([$cid, $today]);
        $upcomingInterviews = $stmt->fetchAll();
    }

    jsonResponse(200, 'Stats retrieved', [
        'total_vacancies' => (int) $totalVacancies,
        'active_vacancies' => (int) $activeVacancies,
        'total_applications' => (int) $totalApplications,
        'total_companies' => (int) $totalCompanies,
        'talent_pool_count' => (int) $talentPoolCount,
        'total_matches' => (int) $totalMatches,
        'recent_applications' => $recentApps,
        'upcoming_interviews' => $upcomingInterviews
    ]);
}

function handleGetSuggestions()
{
    $auth = verifyToken();
    $db = getDB();
    $vacancyId = (int) ($_GET['vacancy_id'] ?? 0);

    if ($vacancyId <= 0) {
        jsonResponse(400, 'Vacancy ID is required');
    }

    // Get current vacancy details
    $stmt = $db->prepare("SELECT title, designation, company_id FROM vacancies WHERE id = ?");
    $stmt->execute([$vacancyId]);
    $vacancy = $stmt->fetch();

    if (!$vacancy) {
        jsonResponse(404, 'Vacancy not found');
    }

    // Prepare title keywords for flexible matching (split by space and remove small/common words)
    $titleKeywords = array_filter(explode(' ', strtolower($vacancy['title'])), function ($word) {
        return strlen($word) > 2 && !in_array($word, ['and', 'the', 'for', 'with', 'job', 'vacancy']);
    });

    $titleMatchSql = "";
    if (!empty($titleKeywords)) {
        $titleConditions = [];
        foreach ($titleKeywords as $keyword) {
            $titleConditions[] = "v.title LIKE ?";
        }
        $titleMatchSql = " OR (" . implode(" AND ", $titleConditions) . ")";
    }

    // Find candidates who:
    // 1. Have future_consent = 1
    // 2. Match by designation OR by important title keywords
    // 3. Have NOT already applied for THIS vacancy
    $sql = "SELECT DISTINCT a.email, a.first_name, a.last_name, a.contact_number, 
                            a.overall_experience, a.relevant_experience, a.qualification, 
                            a.salary_expectation, a.cv_path, v.title as last_applied_vacancy,
                            v.reference_number as job_ref,
                            c.name as last_applied_company,
                            (SELECT status FROM applications WHERE email = a.email ORDER BY applied_at DESC LIMIT 1) as last_status
            FROM applications a
            JOIN vacancies v ON a.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id
            WHERE a.future_consent = 1
              AND a.is_blocked = 0
              AND a.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
              AND a.email NOT IN (SELECT email FROM applications WHERE vacancy_id = ?)
              AND a.email NOT IN (SELECT DISTINCT email FROM applications WHERE is_blocked = 1)
              AND (v.designation = ? $titleMatchSql)";

    $params = [$vacancyId, $vacancy['designation']];
    if (!empty($titleKeywords)) {
        foreach ($titleKeywords as $keyword) {
            $params[] = "%$keyword%";
        }
    }

    // Restriction for company scoped admin
    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $suggestions = $stmt->fetchAll();

    jsonResponse(200, 'Suggested candidates retrieved', $suggestions);
}

function handleGetCandidateCount()
{
    $auth = verifyToken();
    $db = getDB();

    $designation = sanitize($_GET['designation'] ?? '');
    $title = sanitize($_GET['title'] ?? '');
    $companyId = (int) ($_GET['company_id'] ?? 0);

    if (empty($designation) && empty($title) && $companyId <= 0) {
        jsonResponse(200, 'Empty criteria', ['count' => 0]);
    }

    $sql = "SELECT COUNT(DISTINCT a.email) 
            FROM applications a
            JOIN vacancies v ON a.vacancy_id = v.id
            WHERE a.future_consent = 1
              AND a.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";

    $params = [];
    $conditions = [];

    if (!empty($designation)) {
        $conditions[] = "v.designation = ?";
        $params[] = $designation;
    }

    if (!empty($title)) {
        // Simple title keyword matching
        $titleKeywords = array_filter(explode(' ', strtolower($title)), function ($word) {
            return strlen($word) > 2 && !in_array($word, ['and', 'the', 'for', 'with', 'job', 'vacancy']);
        });

        if (!empty($titleKeywords)) {
            $tParts = [];
            foreach ($titleKeywords as $kw) {
                $tParts[] = "v.title LIKE ?";
                $params[] = "%$kw%";
            }
            $conditions[] = "(" . implode(" AND ", $tParts) . ")";
        }
    }

    if (!empty($conditions)) {
        $sql .= " AND (" . implode(" OR ", $conditions) . ")";
    } elseif ($companyId > 0 && $auth['role'] === 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    // Restriction for company scoped admin
    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $count = $stmt->fetchColumn();

    jsonResponse(200, 'Candidate count retrieved', ['count' => (int) $count]);
}

function handleGetMatchingCandidates()
{
    $auth = verifyToken();
    $db = getDB();

    $designation = sanitize($_GET['designation'] ?? '');
    $title = sanitize($_GET['title'] ?? '');
    $companyId = (int) ($_GET['company_id'] ?? 0);

    if (empty($designation) && empty($title) && $companyId <= 0) {
        jsonResponse(200, 'Empty criteria', []);
    }

    $sql = "SELECT DISTINCT a.email, a.first_name, a.last_name, a.contact_number, 
                            a.overall_experience, a.relevant_experience, a.qualification, 
                            a.cv_path, v.title as last_applied_vacancy,
                            c.name as last_applied_company
            FROM applications a
            JOIN vacancies v ON a.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id
            WHERE a.future_consent = 1
              AND a.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";

    $params = [];
    $conditions = [];

    if (!empty($designation)) {
        $conditions[] = "v.designation = ?";
        $params[] = $designation;
    }

    if (!empty($title)) {
        $titleKeywords = array_filter(explode(' ', strtolower($title)), function ($word) {
            return strlen($word) > 2 && !in_array($word, ['and', 'the', 'for', 'with', 'job', 'vacancy']);
        });

        if (!empty($titleKeywords)) {
            $tParts = [];
            foreach ($titleKeywords as $kw) {
                $tParts[] = "v.title LIKE ?";
                $params[] = "%$kw%";
            }
            $conditions[] = "(" . implode(" AND ", $tParts) . ")";
        }
    }

    if (!empty($conditions)) {
        $sql .= " AND (" . implode(" OR ", $conditions) . ")";
    } elseif ($companyId > 0 && $auth['role'] === 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    // Restriction for company scoped admin
    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $candidates = $stmt->fetchAll();

    jsonResponse(200, 'Matching candidates retrieved', $candidates);
}

function handleGetTalentPool()
{
    $auth = verifyToken();
    $db = getDB();

    $search = sanitize($_GET['search'] ?? '');
    $companyId = (int) ($_GET['company_id'] ?? 0);

    $showBlocked = sanitize($_GET['show_blocked'] ?? '');

    $sql = "SELECT a.id, a.email, a.first_name, a.last_name, a.contact_number, 
                            a.overall_experience, a.relevant_experience, a.qualification, 
                            a.cv_path, a.applied_at, a.status as last_status, a.tags,
                            a.is_blocked, a.block_reason,
                            v.title as last_applied_vacancy,
                            c.name as last_applied_company
            FROM applications a
            JOIN (
                SELECT email, MAX(applied_at) as max_date
                FROM applications
                WHERE future_consent = 1
                GROUP BY email
            ) latest ON a.email = latest.email AND a.applied_at = latest.max_date
            JOIN vacancies v ON a.vacancy_id = v.id
            JOIN companies c ON v.company_id = c.id
            WHERE a.future_consent = 1
              AND a.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
    
    // Base SQL for counting before filtering by is_blocked
    $countSql = "SELECT SUM(CASE WHEN a.is_blocked = 0 THEN 1 ELSE 0 END) as active_count,
                        SUM(CASE WHEN a.is_blocked = 1 THEN 1 ELSE 0 END) as blocked_count
                 FROM applications a
                 JOIN (
                     SELECT email, MAX(applied_at) as max_date
                     FROM applications
                     WHERE future_consent = 1
                     GROUP BY email
                 ) latest ON a.email = latest.email AND a.applied_at = latest.max_date
                 JOIN vacancies v ON a.vacancy_id = v.id
                 WHERE a.future_consent = 1
                   AND a.applied_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)";
    
    $countParams = [];
    if ($companyId > 0) {
        $countSql .= " AND v.company_id = ?";
        $countParams[] = $companyId;
    }
    
    if ($auth['role'] !== 'super_admin') {
        $countSql .= " AND v.company_id = ?";
        $countParams[] = $auth['company_id'];
    }
    
    $stmt = $db->prepare($countSql);
    $stmt->execute($countParams);
    $counts = $stmt->fetch();
    $activeCount = (int)($counts['active_count'] ?? 0);
    $blockedCount = (int)($counts['blocked_count'] ?? 0);

    if ($showBlocked === '1') {
        $sql .= " AND a.is_blocked = 1";
    } else {
        $sql .= " AND a.is_blocked = 0";
    }

    $params = [];

    if (!empty($search)) {
        $sql .= " AND (a.first_name LIKE ? OR a.last_name LIKE ? OR a.email LIKE ? OR v.designation LIKE ?)";
        $searchParam = "%$search%";
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
        $params[] = $searchParam;
    }

    if ($companyId > 0) {
        $sql .= " AND v.company_id = ?";
        $params[] = $companyId;
    }

    $overallExperience = sanitize($_GET['overall_experience'] ?? '');
    if (!empty($overallExperience)) {
        $expTiers = getExperienceAtLeast($overallExperience);
        $placeholders = implode(',', array_fill(0, count($expTiers), '?'));
        $sql .= " AND a.overall_experience IN ($placeholders)";
        $params = array_merge($params, $expTiers);
    }

    $qualification = sanitize($_GET['qualification'] ?? '');
    if (!empty($qualification)) {
        $sql .= " AND a.qualification = ?";
        $params[] = $qualification;
    }

    $tagFilter = sanitize($_GET['tag'] ?? '');
    if (!empty($tagFilter)) {
        $sql .= " AND a.tags LIKE ?";
        $params[] = "%$tagFilter%";
    }

    $statusFilter = sanitize($_GET['status'] ?? '');
    if (!empty($statusFilter)) {
        $sql .= " AND a.status = ?";
        $params[] = $statusFilter;
    }

    // Restriction for company scoped admin
    if ($auth['role'] !== 'super_admin') {
        $sql .= " AND v.company_id = ?";
        $params[] = $auth['company_id'];
    }

    $sql .= " ORDER BY a.applied_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $candidates = $stmt->fetchAll();

    jsonResponse(200, 'Talent pool retrieved', [
        'candidates' => $candidates,
        'active_count' => $activeCount,
        'blocked_count' => $blockedCount
    ]);
}

function handleBlockCandidate()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to block candidates');
    }
    $db = getDB();

    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        // Fallback to POST
        $data = $_POST;
    }

    $email = sanitize($data['email'] ?? '');
    $blockReason = sanitize($data['block_reason'] ?? '');

    if (empty($email)) {
        jsonResponse(400, 'Email is required');
    }
    if (empty($blockReason)) {
        jsonResponse(400, 'Block reason is required');
    }

    // Block ALL applications from this email
    $stmt = $db->prepare("UPDATE applications SET is_blocked = 1, block_reason = ? WHERE email = ?");
    $stmt->execute([$blockReason, $email]);

    $affected = $stmt->rowCount();
    jsonResponse(200, "Candidate blocked successfully ($affected records updated)");
}

function handleUnblockCandidate()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to unblock candidates');
    }
    $db = getDB();

    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        $data = $_POST;
    }

    $email = sanitize($data['email'] ?? '');

    if (empty($email)) {
        jsonResponse(400, 'Email is required');
    }

    $stmt = $db->prepare("UPDATE applications SET is_blocked = 0, block_reason = NULL WHERE email = ?");
    $stmt->execute([$email]);

    jsonResponse(200, 'Candidate unblocked successfully');
}

function handleUpdateCandidateTags()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to update candidate tags');
    }
    $db = getDB();

    $id = (int) ($_POST['id'] ?? 0);
    $tags = sanitize($_POST['tags'] ?? '');

    if ($id <= 0) {
        jsonResponse(400, 'Invalid application ID');
    }

    $sql = "UPDATE applications SET tags = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$tags, $id]);

    jsonResponse(200, 'Tags updated successfully');
}

function handleViewCV()
{
    // Suppress errors during streaming to avoid corrupting the file output
    ini_set('display_errors', 0);

    // Completely clear and stop all output buffering
    while (ob_get_level()) {
        ob_end_clean();
    }

    $file = $_GET['file'] ?? '';
    if (empty($file)) {
        header('Content-Type: application/json');
        echo json_encode(['message' => 'No file parameter provided']);
        exit;
    }

    // Security: basename ensures no directory traversal
    $file = basename($file);

    // Try both possible relative paths to be safe
    $possiblePaths = [
        __DIR__ . '/../uploads/cv/' . $file,
        dirname(__DIR__) . '/uploads/cv/' . $file
    ];

    $filePath = null;
    foreach ($possiblePaths as $path) {
        if (file_exists($path)) {
            $filePath = $path;
            break;
        }
    }

    if (!$filePath) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(['message' => 'Document not found on server']);
        exit;
    }

    // Modern browser headers for PDF/Doc streaming
    header('Access-Control-Allow-Origin: *');
    header('Content-Description: File Transfer');

    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    $mimeTypes = [
        'pdf' => 'application/pdf',
        'doc' => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg'
    ];

    $mimeType = $mimeTypes[$extension] ?? 'application/octet-stream';

    header("Content-Type: " . $mimeType);
    header("Content-Disposition: inline; filename=\"" . $file . "\"");
    header("Content-Length: " . filesize($filePath));
    header("Content-Transfer-Encoding: binary");
    header("Cache-Control: public, max-age=3600");
    header("Pragma: public");

    // Clear buffer one last time before streaming
    if (ob_get_length())
        ob_clean();
    flush();

    readfile($filePath);
    exit;
}

function handleDeleteApplication()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to delete applications');
    }
    $db = getDB();

    $id = (int) ($_POST['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(400, 'Invalid application ID');
    }

    // Optional: Delete CV file if needed, but keeping it for now for record safety.
    $sql = "DELETE FROM applications WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);

    jsonResponse(200, 'Application deleted successfully');
}

function handleBulkDeleteApplications()
{
    $auth = verifyToken();
    if ($auth['role'] === 'sub_admin') {
        jsonResponse(403, 'Sub-admins do not have permission to delete applications');
    }
    $db = getDB();

    $ids = $_POST['ids'] ?? [];
    if (!is_array($ids) || empty($ids)) {
        jsonResponse(400, 'Invalid or empty IDs');
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $sql = "DELETE FROM applications WHERE id IN ($placeholders)";
    $stmt = $db->prepare($sql);
    $stmt->execute($ids);

    jsonResponse(200, count($ids) . ' applications deleted successfully');
}
