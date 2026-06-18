<?php
// ============================================
// George Steuart Job Portal - Configuration
// ============================================

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Global Autoloader
require_once __DIR__ . '/libs/autoload.php';

// ---- DATABASE ----
define('DB_HOST', 'localhost');
define('DB_NAME', 'gs_jobs');
define('DB_USER', 'root');
define('DB_PASS', '');

// ---- JWT SECRET ----
define('JWT_SECRET', 'gs_job_portal_secret_key_2026');

// ---- EMAIL SETTINGS ----
define('EMAIL_ENABLED', true); // Set to false to disable emails
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587); // 587 for TLS, 465 for SSL
define('SMTP_SECURE', 'tls'); // 'tls' or 'ssl'
define('SMTP_USER', 'prathibhajay098@gmail.com'); // Updated with user's email from logs
define('SMTP_PASS', 'tyjq cahg wakd qwnl'); // User provided App Password
define('SMTP_FROM_NAME', 'George Steuart Careers');
define('SMTP_REPLY_TO', 'no-reply@georgesteuart.com');
define('SMTP_DEBUG', 0); // 0 = off, 1 = client, 2 = client and server

// ---- FRONTEND URL ----
// If your frontend runs on a different port (e.g. 3001), update this value
define('FRONTEND_URL', 'http://localhost:3000');

// ---- FILE UPLOADS ----
define('UPLOAD_DIR', __DIR__ . '/uploads/cv/');
define('MAX_CV_SIZE', 5 * 1024 * 1024); // 5MB

// ---- CORS Headers ----
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// Only set JSON header if not viewing a CV
if (!isset($_GET['action']) || $_GET['action'] !== 'view_cv') {
    header('Content-Type: application/json; charset=UTF-8');
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---- Database Connection ----
function getDB()
{
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
                );
        }
        catch (PDOException $e) {
            jsonResponse(500, 'Database connection failed');
        }
    }
    return $pdo;
}

// ---- Helper Functions ----
function jsonResponse($code, $message, $data = null, $continue = false)
{
    // Clear any previous output to ensure clean JSON response
    if (ob_get_level() > 0) {
        ob_clean();
    }

    http_response_code($code);
    $resp = ['message' => $message];
    if ($data !== null)
        $resp['data'] = $data;
    
    $output = json_encode($resp);
    
    if ($continue) {
        // For non-blocking response, we MUST set Content-Length accurately
        header('Connection: close');
        header('Content-Type: application/json; charset=UTF-8');
        header('Content-Length: ' . strlen($output));
        echo $output;
        if (ob_get_level() > 0) {
            ob_end_flush();
        }
        flush();
        // Script continues after this...
    } else {
        echo $output;
        exit();
    }
}

function sanitize($str)
{
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

function generateToken($adminId, $role, $companyId)
{
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'admin_id' => $adminId,
        'role' => $role,
        'company_id' => $companyId,
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ]));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

function verifyToken()
{
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (empty($authHeader) || !preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        jsonResponse(401, 'Authentication required');
    }

    $token = $matches[1];
    $parts = explode('.', $token);

    if (count($parts) !== 3) {
        jsonResponse(401, 'Invalid token');
    }

    $signature = base64_encode(hash_hmac('sha256', "$parts[0].$parts[1]", JWT_SECRET, true));

    if (!hash_equals($signature, $parts[2])) {
        jsonResponse(401, 'Invalid token');
    }

    $payload = json_decode(base64_decode($parts[1]), true);

    if ($payload['exp'] < time()) {
        jsonResponse(401, 'Token expired');
    }

    return $payload;
}

function requireSuperAdmin()
{
    $auth = verifyToken();
    if ($auth['role'] !== 'super_admin') {
        jsonResponse(403, 'Super admin access required');
    }
    return $auth;
}

function requireAdminOrSuperAdmin()
{
    $auth = verifyToken();
    if ($auth['role'] !== 'super_admin' && $auth['role'] !== 'admin') {
        jsonResponse(403, 'Admin or Super admin access required');
    }
    return $auth;
}

// Create upload directory if not exists
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// ---- EMAIL UTILITY ----
function sendEmail($to, $toName, $subject, $body)
{
    if (!defined('EMAIL_ENABLED') || !EMAIL_ENABLED) return true;

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port       = SMTP_PORT;

        // Recipients
        $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
        $mail->addAddress($to, $toName);
        $mail->addReplyTo(SMTP_REPLY_TO, 'Support');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));

        $mail->send();
        return true;
    } catch (\Exception $e) {
        error_log("Mail Error: " . $mail->ErrorInfo);
        return false;
    }
}

function queueEmail($to, $toName, $subject, $body)
{
    if (!defined('EMAIL_ENABLED') || !EMAIL_ENABLED) return true;

    try {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO email_queue (recipient_email, recipient_name, subject, body, status, attempts) VALUES (?, ?, ?, ?, 'pending', 0)");
        $stmt->execute([$to, $toName, $subject, $body]);
        
        // Asynchronously trigger the email queue processor script
        $scriptPath = __DIR__ . '/scripts/process_queue.php';
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows background execution
            $cmd = "start /B php \"" . $scriptPath . "\" > NUL 2>&1";
            pclose(popen($cmd, "r"));
        } else {
            // Linux/macOS background execution
            $cmd = "php \"" . $scriptPath . "\" > /dev/null 2>&1 &";
            exec($cmd);
        }
        return true;
    } catch (\Exception $e) {
        error_log("Queue Email Error: " . $e->getMessage());
        return false;
    }
}


