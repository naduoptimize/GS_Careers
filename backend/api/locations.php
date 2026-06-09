<?php
// ============================================
// Company Locations API - CRUD
// ============================================
require_once __DIR__ . '/../config.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list':
        listLocations();
        break;
    case 'create':
        createLocation();
        break;
    case 'update':
        updateLocation();
        break;
    case 'delete':
        deleteLocation();
        break;
    default:
        jsonResponse(400, 'Invalid action');
}

function listLocations()
{
    $db = getDB();
    $stmt = $db->prepare("
        SELECT cl.*, c.name AS company_name, c.logo AS company_logo
        FROM company_locations cl
        JOIN companies c ON cl.company_id = c.id
        ORDER BY c.name ASC, cl.location ASC
    ");
    $stmt->execute();
    $locations = $stmt->fetchAll();
    jsonResponse(200, 'Locations retrieved', $locations);
}

function createLocation()
{
    $auth = verifyToken();
    if ($auth['role'] !== 'admin') {
        jsonResponse(403, 'Global admin access required to manage company locations');
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $company_id = (int)($input['company_id'] ?? 0);
    $location = sanitize($input['location'] ?? '');

    if ($company_id <= 0 || empty($location)) {
        jsonResponse(400, 'Company entity and Location name are required');
    }

    $db = getDB();
    
    // Verify company exists
    $stmt = $db->prepare("SELECT id FROM companies WHERE id = ?");
    $stmt->execute([$company_id]);
    if (!$stmt->fetch()) {
        jsonResponse(404, 'Company entity not found');
    }

    // Check if location already exists for this company
    $stmt = $db->prepare("SELECT id FROM company_locations WHERE company_id = ? AND location = ?");
    $stmt->execute([$company_id, $location]);
    if ($stmt->fetch()) {
        jsonResponse(400, 'This location is already registered for this company');
    }

    $stmt = $db->prepare("INSERT INTO company_locations (company_id, location) VALUES (?, ?)");
    $stmt->execute([$company_id, $location]);

    jsonResponse(201, 'Company location added successfully', ['id' => $db->lastInsertId()]);
}

function updateLocation()
{
    $auth = verifyToken();
    if ($auth['role'] !== 'admin') {
        jsonResponse(403, 'Global admin access required to manage company locations');
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);
    $location = sanitize($input['location'] ?? '');

    if ($id <= 0 || empty($location)) {
        jsonResponse(400, 'Location ID and Name are required');
    }

    $db = getDB();

    // Verify location exists
    $stmt = $db->prepare("SELECT id, company_id FROM company_locations WHERE id = ?");
    $stmt->execute([$id]);
    $loc = $stmt->fetch();
    if (!$loc) {
        jsonResponse(404, 'Location not found');
    }

    // Check if duplicate location exists for this company
    $stmt = $db->prepare("SELECT id FROM company_locations WHERE company_id = ? AND location = ? AND id != ?");
    $stmt->execute([$loc['company_id'], $location, $id]);
    if ($stmt->fetch()) {
        jsonResponse(400, 'This location is already registered for this company');
    }

    $stmt = $db->prepare("UPDATE company_locations SET location = ? WHERE id = ?");
    $stmt->execute([$location, $id]);

    jsonResponse(200, 'Location updated successfully');
}

function deleteLocation()
{
    $auth = verifyToken();
    if ($auth['role'] !== 'admin') {
        jsonResponse(403, 'Global admin access required to manage company locations');
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $id = (int)($input['id'] ?? 0);

    if ($id <= 0) {
        jsonResponse(400, 'Invalid location ID');
    }

    $db = getDB();

    // Verify location exists
    $stmt = $db->prepare("SELECT id FROM company_locations WHERE id = ?");
    $stmt->execute([$id]);
    if (!$stmt->fetch()) {
        jsonResponse(404, 'Location not found');
    }

    $stmt = $db->prepare("DELETE FROM company_locations WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse(200, 'Location deleted successfully');
}
