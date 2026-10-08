<?php
require_once __DIR__ . '/../backend/config.php';

$db = getDB();
$stmt = $db->query("SELECT id, first_name, last_name, email, cv_path FROM applications ORDER BY id DESC LIMIT 20");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "Total latest applications:\n";
foreach ($rows as $r) {
    echo "ID #{$r['id']}: {$r['first_name']} {$r['last_name']} ({$r['email']}) -> Path: {$r['cv_path']}\n";
}
