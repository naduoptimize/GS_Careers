<?php
// ============================================
// Settings API (Super Admin Only)
// ============================================
require_once __DIR__ . '/../config.php';

// Authenticate super admin
$auth = requireSuperAdmin();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    getSettings();
} elseif ($method === 'POST') {
    if (isset($_GET['action']) && $_GET['action'] === 'test') {
        testSmtpConnection();
    } else {
        saveSettings();
    }
} else {
    jsonResponse(405, 'Method not allowed');
}

function getSettings()
{
    $db = getDB();
    $stmt = $db->prepare("SELECT setting_key, setting_value FROM settings");
    $stmt->execute();
    $results = $stmt->fetchAll();

    $settings = [];
    foreach ($results as $row) {
        if ($row['setting_key'] === 'smtp_pass' && !empty($row['setting_value'])) {
            $settings[$row['setting_key']] = '********';
        } else {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
    }

    // Default fallback values for PDPA settings
    $pdpaDefaults = [
        'pdpa_title' => 'Personal Data Protection Act (PDPA) Compliance',
        'pdpa_description' => 'In accordance with the Personal Data Protection Act (PDPA), we require your explicit consent to store, process, and retain your CV and personal information for future job openings.',
        'pdpa_purpose' => 'Your details will be accessed by our HR team to match you with suitable future career opportunities.',
        'pdpa_retention' => 'If consented, your data will be securely stored in our Talent Pool for a maximum duration of 1 year.',
        'pdpa_security' => 'All personal data is processed under strict confidentiality and industry-standard security measures.',
        'pdpa_rights' => 'You can withdraw your consent at any time by contacting our HR department.'
    ];

    foreach ($pdpaDefaults as $key => $defaultVal) {
        if (!isset($settings[$key]) || $settings[$key] === '') {
            $settings[$key] = $defaultVal;
        }
    }

    // Default fallback values for Email templates (Full HTML Structures)
    $emailDefaults = [
        'email_template_confirmation_subject' => 'Application Received - {job_title} | George Steuart Group',
        'email_template_confirmation_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
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
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <div class="greeting">Hello {name},</div>
                <div class="success-badge">✓ Application Received Successfully</div>
                <p>Thank you for your interest in joining <strong>George Steuart Group</strong>. We have successfully received your application and it is now being reviewed by our Talent Acquisition team.</p>
                
                <div class="info-card">
                    <div class="info-row">
                        <div class="info-label">Position</div>
                        <div class="info-value">{job_title}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Job Reference No</div>
                        <div class="info-value">{ref_no}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Entity</div>
                        <div class="info-value">{company}</div>
                    </div>
                </div>

                <div class="next-steps">
                    <h3>What\'s next?</h3>
                    <p style="margin-bottom: 0; font-size: 14px;">Our team will evaluate your profile against the role requirements. If your experience aligns with our needs, we will reach out to you directly for the next steps in the selection process.</p>
                </div>
                
                <p style="margin-top: 30px;">Best regards,<br>
                <strong style="color: #1a1a2e;">Talent Acquisition Team</strong><br>
                George Steuart Group</p>
            </div>
            <hr class="footer-divider">
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                No. 439, Galle Road, Colombo 03, Sri Lanka.<br>
                <p style="font-size: 10px; margin-top: 15px;">This is an automated system notification. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>',

        'email_template_shortlist_subject' => 'Interview Invitation - {job_title} | George Steuart Group',
        'email_template_shortlist_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f0f4f8; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f0f4f8; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #c8a951; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .content { padding: 40px 35px; }
        .greeting { font-size: 22px; color: #1a1a2e; margin-bottom: 20px; font-weight: 700; }
        .details-box { background-color: #fffaf0; border-radius: 12px; padding: 30px; margin: 25px 0; border: 1px solid #fbd38d; }
        .details-title { font-size: 16px; font-weight: 700; color: #1a1a2e; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #fbd38d; padding-bottom: 10px; }
        .detail-item { margin-bottom: 15px; display: flex; align-items: baseline; }
        .detail-label { font-weight: 700; color: #718096; width: 130px; font-size: 12px; text-transform: uppercase; }
        .detail-value { font-weight: 600; color: #2d3748; flex: 1; font-size: 15px; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
        .confirm-btn { display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important; }
        .confirm-btn.yes { background-color: #10b981; }
        .confirm-btn.no { background-color: #ef4444; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
            .detail-item { display: block !important; margin-bottom: 12px !important; }
            .detail-label { width: 100% !important; display: block !important; margin-bottom: 4px !important; }
            .detail-value { width: 100% !important; display: block !important; }
            .confirm-btn { display: block !important; width: auto !important; margin-right: 0 !important; margin-bottom: 12px !important; text-align: center !important; padding: 12px 10px !important; border-left: 0 !important; border-right: 0 !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <div class="greeting">Dear {name},</div>
                <p>We are pleased to inform you that after reviewing your application for the position of <strong>{job_title}</strong> (Ref: {ref_no}), you have been <span style="color: #c8a951; font-weight: 800;">SHORTLISTED</span> for the next stage of our selection process.</p>
                
                <div class="details-box">
                    <div class="details-title">Interview Details</div>
                    <div class="detail-item">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">{interview_type}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">{interview_date}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Time</div>
                        <div class="detail-value">{interview_time}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">{interview_location}</div>
                    </div>
                </div>

                <p style="margin-top: 25px; font-weight: bold;">Please confirm your availability for this schedule by clicking one of the buttons below:</p>
                <div style="text-align: center; margin: 25px 0;">
                    <a href="{confirm_url_yes}" class="confirm-btn yes" style="display: inline-block; padding: 12px 24px; background-color: #10b981; border-top: 12px solid #10b981; border-bottom: 12px solid #10b981; border-left: 24px solid #10b981; border-right: 24px solid #10b981; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important; margin-right: 15px;">Yes, I am available</a>
                    <a href="{confirm_url_no}" class="confirm-btn no" style="display: inline-block; padding: 12px 24px; background-color: #ef4444; border-top: 12px solid #ef4444; border-bottom: 12px solid #ef4444; border-left: 24px solid #ef4444; border-right: 24px solid #ef4444; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important;">No, I cannot attend</a>
                </div>

                <p>We look forward to discussing your potential contribution to George Steuart Group.</p>

                <p style="margin-top: 30px;">Best regards,<br>
                <strong style="color: #1a1a2e;">Talent Acquisition Team</strong><br>
                George Steuart Group</p>
            </div>
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                <p style="font-size: 10px; margin-top: 10px;">This is an automated notification.</p>
            </div>
        </div>
    </div>
</body>
</html>',

        'email_template_rejection_subject' => 'Application Status Update - {job_title} | George Steuart Group',
        'email_template_rejection_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; margin: 0; padding: 0; background-color: #f8fafc; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 4px solid #ef4444; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #ef4444; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .content { padding: 40px 35px; }
        .greeting { font-size: 20px; color: #1a1a2e; margin-bottom: 24px; font-weight: 700; }
        .info-bar { background-color: #f1f5f9; padding: 12px 20px; border-radius: 8px; font-size: 13px; color: #64748b; margin-bottom: 25px; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <div class="greeting">Dear {name},</div>
                <div class="info-bar">Position: {job_title} | Ref: {ref_no}</div>
                <p>Thank you for the time and effort you invested in applying for the position of <strong>{job_title}</strong> at <strong>{company}</strong>.</p>
                
                <p>After a thorough review of all applications, we regret to inform you that we will not be moving forward with your candidacy at this time. Our team received a significant number of competitive applications, making our selection process extremely competitive.</p>
                
                <p>We truly appreciate your interest in George Steuart Group and encourage you to apply for other positions that align with your expertise in the future.</p>
                
                <p style="margin-bottom: 0;">We wish you the very best in your professional endeavors.</p>
                
                <p style="margin-top: 30px;">Sincerely,<br>
                <strong style="color: #1a1a2e;">Talent Acquisition Team</strong><br>
                George Steuart Group</p>
            </div>
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                No. 439, Galle Road, Colombo 03, Sri Lanka.<br>
            </div>
        </div>
    </div>
</body>
</html>',

        // Vacancy Requisition Workflow Templates
        'email_template_vacancy_pending_subject' => 'Action Required: Vacancy Requisition Pending Approval - {ref_no}',
        'email_template_vacancy_pending_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f0f4f8; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f0f4f8; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #c8a951; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .content { padding: 40px 35px; }
        .greeting { font-size: 14px; color: #64748b; margin-bottom: 6px; }
        .status-pill { display: inline-block; background-color: #ffedd5; color: #c2410c; padding: 5px 14px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border: 1px solid #fed7aa; }
        .details-box { background-color: #f8fafc; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #e2e8f0; }
        .details-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px 0; font-size: 14px; }
        .info-label { color: #64748b; font-weight: 700; width: 150px; }
        .info-value { color: #1e293b; font-weight: 600; }
        .note-box { background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px 18px; margin-bottom: 28px; }
        .note-title { margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.5px; }
        .note-desc { margin: 0; font-size: 13px; color: #475569; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
        .btn-link { display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important; background-color: #c8a951; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
            .info-table td { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 4px 0 !important; }
            .info-label { width: 100% !important; }
            .btn-link { display: block !important; width: auto !important; text-align: center !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <p class="greeting">Dear <strong>{reviewer_name}</strong>,</p>
                <div class="status-pill">Pending Your Approval</div>
                <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#1a0208;line-height:1.3;">Requisition Requires Your Review</h2>
                
                <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">A new job vacancy requisition has been submitted and is awaiting your approval before it proceeds to publication.</p>
                
                <div class="details-box">
                    <div class="details-title">Requisition Details</div>
                    <table class="info-table">
                        <tr>
                            <td class="info-label">Position / Title</td>
                            <td class="info-value">{job_title}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Reference No.</td>
                            <td class="info-value" style="color:#C8A951; font-family:monospace;">{ref_no}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Company</td>
                            <td class="info-value">{company}</td>
                        </tr>
                    </table>
                </div>

                <div class="note-box">
                    <div class="note-title">⚠️ Action Required</div>
                    <p class="note-desc">Please review the details carefully and either approve to publish/forward it, or reject it with comments.</p>
                </div>

                <div style="text-align:center;margin-bottom:8px;">
                    <a href="{review_url}" class="btn-link">Review & Approve Requisition</a>
                </div>
            </div>
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                <p style="font-size: 10px; margin-top: 10px;">This is an automated system notification. Please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>',

        'email_template_vacancy_approved_subject' => 'Vacancy Approved & Published — {ref_no}',
        'email_template_vacancy_approved_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f0f4f8; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f0f4f8; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #c8a951; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #c8a951; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .content { padding: 40px 35px; }
        .greeting { font-size: 14px; color: #64748b; margin-bottom: 6px; }
        .status-pill { display: inline-block; background-color: #e2fbf0; color: #10b981; padding: 5px 14px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border: 1px solid #bbf7d0; }
        .details-box { background-color: #f0fdf4; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #bbf7d0; }
        .details-title { font-size: 11px; font-weight: 700; color: #15803d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px 0; font-size: 14px; }
        .info-label { color: #15803d; font-weight: 700; width: 150px; }
        .info-value { color: #166534; font-weight: 600; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
        .btn-link { display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important; background-color: #10b981; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
            .info-table td { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 4px 0 !important; }
            .info-label { width: 100% !important; }
            .btn-link { display: block !important; width: auto !important; text-align: center !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <p class="greeting">Dear <strong>{recipient_name}</strong>,</p>
                <div class="status-pill">Approved & Published</div>
                <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#166534;line-height:1.3;">🎉 Vacancy Approved & Published</h2>
                
                <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">Great news! The job vacancy requisition has been approved and is now successfully published and live on the careers portal. Candidates can now view and apply for this position.</p>
                
                <div class="details-box">
                    <div class="details-title">Approved Requisition</div>
                    <table class="info-table">
                        <tr>
                            <td class="info-label">Position / Title</td>
                            <td class="info-value">{job_title}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Reference No.</td>
                            <td class="info-value" style="color:#16a34a; font-family:monospace;">{ref_no}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Company</td>
                            <td class="info-value">{company}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align:center;margin-bottom:8px;">
                    <a href="{review_url}" class="btn-link">View Vacancy in Portal</a>
                </div>
            </div>
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                <p style="font-size: 10px; margin-top: 10px;">This is an automated system notification. Please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>',

        'email_template_vacancy_rejected_subject' => 'Vacancy Returned for Revision - {ref_no}',
        'email_template_vacancy_rejected_body' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f0f4f8; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f0f4f8; padding-bottom: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .header { background-color: #1a1a2e; padding: 40px 20px; text-align: center; border-bottom: 5px solid #ef4444; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
        .header p { color: #ef4444; margin: 5px 0 0; text-transform: uppercase; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; }
        .content { padding: 40px 35px; }
        .greeting { font-size: 14px; color: #64748b; margin-bottom: 6px; }
        .status-pill { display: inline-block; background-color: #fff5f5; color: #c53030; padding: 5px 14px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border: 1px solid #feb2b2; }
        .feedback-box { background: linear-gradient(135deg, #fff5f5 0%, #fffbfb 100%); border: 1px solid #feb2b2; border-left: 4px solid #e53e3e; border-radius: 10px; padding: 20px; margin-bottom: 28px; }
        .feedback-title { margin: 0 0 8px; font-size: 11px; font-weight: 800; color: #c53030; text-transform: uppercase; letter-spacing: 0.8px; }
        .feedback-desc { margin: 0; font-size: 14px; color: #2d3748; font-weight: 600; line-height: 1.6; font-style: italic; }
        .details-box { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 28px; }
        .details-title { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 14px; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px 0; font-size: 14px; }
        .info-label { color: #64748b; font-weight: 700; width: 150px; }
        .info-value { color: #1e293b; font-weight: 600; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0; }
        .btn-link { display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; color: #ffffff !important; background-color: #e53e3e; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; margin-top: 10px !important; border-radius: 8px !important; }
            .content { padding: 25px 20px !important; }
            .info-table td { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 4px 0 !important; }
            .info-label { width: 100% !important; }
            .btn-link { display: block !important; width: auto !important; text-align: center !important; }
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>GEORGE STEUART</h1>
                <p>ESTABLISHED 1835</p>
            </div>
            <div class="content">
                <p class="greeting">Dear <strong>{recipient_name}</strong>,</p>
                <div class="status-pill">Revision Required</div>
                <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#e53e3e;line-height:1.3;">Vacancy Requisition Returned for Revision</h2>
                
                <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">The vacancy requisition you submitted has been reviewed and has been returned with feedback for revision.</p>
                
                <div class="feedback-box">
                    <div class="feedback-title">Reviewer Feedback & Reason</div>
                    <p class="feedback-desc">&ldquo;{reason}&rdquo;</p>
                </div>

                <div class="details-box">
                    <div class="details-title">Requisition Details</div>
                    <table class="info-table">
                        <tr>
                            <td class="info-label">Position / Title</td>
                            <td class="info-value">{job_title}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Reference No.</td>
                            <td class="info-value" style="color:#b91c1c; font-family:monospace;">{ref_no}</td>
                        </tr>
                        <tr>
                            <td class="info-label">Company</td>
                            <td class="info-value">{company}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align:center;margin-bottom:8px;">
                    <a href="{review_url}" class="btn-link">Edit & Resubmit Requisition</a>
                </div>
            </div>
            <div class="footer">
                &copy; {current_year} George Steuart Group. All Rights Reserved.<br>
                <p style="font-size: 10px; margin-top: 10px;">This is an automated system notification. Please do not reply.</p>
            </div>
        </div>
    </div>
</body>
</html>'
    ];

    foreach ($emailDefaults as $key => $defaultVal) {
        if (!isset($settings[$key]) || $settings[$key] === '' || (strpos($key, '_body') !== false && strpos($settings[$key], '<!DOCTYPE html>') === false)) {
            $settings[$key] = $defaultVal;
        }
    }

    // Add default fallback email from config constant
    $settings['default_email'] = defined('SMTP_USER') ? SMTP_USER : '';
    $settings['default_smtp_host'] = defined('SMTP_HOST') ? SMTP_HOST : '';
    $settings['default_smtp_port'] = defined('SMTP_PORT') ? SMTP_PORT : '';
    $settings['default_smtp_secure'] = defined('SMTP_SECURE') ? SMTP_SECURE : '';
    $settings['default_smtp_user'] = defined('SMTP_USER') ? SMTP_USER : '';
    $settings['default_smtp_from_name'] = defined('SMTP_FROM_NAME') ? SMTP_FROM_NAME : '';

    jsonResponse(200, 'Settings retrieved', $settings);
}

function saveSettings()
{
    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        jsonResponse(400, 'Invalid settings data');
    }

    $db = getDB();
    $db->beginTransaction();

    try {
        foreach ($input as $key => $value) {
            $key = sanitize($key);
            $value = sanitize($value);

            // Skip updating sensitive keys if they are masked
            if ($key === 'smtp_pass' && $value === '********') {
                continue;
            }

            // Validate email format if key is system_email and not empty
            if ($key === 'system_email' && !empty($value)) {
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    jsonResponse(400, 'Invalid email address format');
                }
            }

            // Insert or update setting
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
            $stmt->execute([$key, $value, $value]);
        }

        $db->commit();
        jsonResponse(200, 'Settings saved successfully');
    } catch (Exception $e) {
        $db->rollBack();
        jsonResponse(500, 'Failed to save settings: ' . $e->getMessage());
    }
}

function testSmtpConnection()
{
    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) {
        jsonResponse(400, 'Invalid settings data');
    }

    // Retrieve input values
    $smtp_host = sanitize($input['smtp_host'] ?? '');
    $smtp_port = isset($input['smtp_port']) ? (int)$input['smtp_port'] : 0;
    $smtp_secure = sanitize($input['smtp_secure'] ?? '');
    $smtp_user = sanitize($input['smtp_user'] ?? '');
    $smtp_pass = sanitize($input['smtp_pass'] ?? '');
    $smtp_from_name = sanitize($input['smtp_from_name'] ?? '');
    $system_email = sanitize($input['system_email'] ?? '');
    $test_recipient = sanitize($input['test_recipient'] ?? '');

    // Validation
    if (empty($system_email) || !filter_var($system_email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, 'Invalid sender email address');
    }
    if (empty($test_recipient) || !filter_var($test_recipient, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(400, 'Invalid test recipient email address');
    }

    // Fallbacks if empty
    if (empty($smtp_host)) $smtp_host = SMTP_HOST;
    if (empty($smtp_port)) $smtp_port = SMTP_PORT;
    if (empty($smtp_secure)) $smtp_secure = SMTP_SECURE;
    if (empty($smtp_user)) $smtp_user = SMTP_USER;
    if (empty($smtp_from_name)) $smtp_from_name = SMTP_FROM_NAME;
    
    // If password is '********', retrieve the saved password from database
    if ($smtp_pass === '********') {
        try {
            $db = getDB();
            $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = 'smtp_pass'");
            $stmt->execute();
            $saved_pass = $stmt->fetchColumn();
            $smtp_pass = !empty($saved_pass) ? $saved_pass : SMTP_PASS;
        } catch (\Exception $ex) {
            $smtp_pass = SMTP_PASS;
        }
    } else if (empty($smtp_pass)) {
        $smtp_pass = SMTP_PASS;
    }

    // Attempt PHPMailer connection
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    
    // Set up debug capture
    $debugLog = "";
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) use (&$debugLog) {
        $debugLog .= $str . "\n";
    };

    try {
        $mail->isSMTP();
        $mail->Host       = $smtp_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp_user;
        $mail->Password   = $smtp_pass;
        $mail->SMTPSecure = $smtp_secure;
        $mail->Port       = $smtp_port;
        $mail->Timeout    = 12;

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        $mail->setFrom($system_email, $smtp_from_name);
        $mail->addAddress($test_recipient, 'Test Recipient');
        $mail->isHTML(true);
        $mail->Subject = 'George Steuart SMTP Portal Verification';
        $mail->Body    = '<h3>SMTP Setup Works Perfectly!</h3>'
                       . '<p>Your George Steuart careers portal settings have been successfully tested and verified.</p>'
                       . '<ul>'
                       . '<li><strong>Sender Email:</strong> ' . htmlspecialchars($system_email) . '</li>'
                       . '<li><strong>SMTP Host:</strong> ' . htmlspecialchars($smtp_host) . '</li>'
                       . '<li><strong>SMTP Port:</strong> ' . htmlspecialchars($smtp_port) . '</li>'
                       . '<li><strong>SMTP Username:</strong> ' . htmlspecialchars($smtp_user) . '</li>'
                       . '</ul>';

        $mail->send();
        jsonResponse(200, 'Test email sent successfully', [
            'debug' => $debugLog
        ]);
    } catch (\Exception $e) {
        jsonResponse(500, 'SMTP connection test failed: ' . $mail->ErrorInfo, [
            'debug' => $debugLog
        ]);
    }
}
?>
