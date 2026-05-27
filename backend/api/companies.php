<?php
// ============================================
// Companies API
// ============================================
require_once __DIR__ . '/../config.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list':
        listCompanies();
        break;
    default:
        jsonResponse(400, 'Invalid action');
}

function listCompanies()
{
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM companies ORDER BY id ASC");
    $stmt->execute();
    $companies = $stmt->fetchAll();
    jsonResponse(200, 'Companies retrieved', $companies);
}
