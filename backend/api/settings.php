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

            // Skip updating smtp_pass if it's masked
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
