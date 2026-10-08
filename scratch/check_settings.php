<?php
require_once __DIR__ . '/../backend/config.php';
$db = getDB();
$stmt = $db->query("SELECT setting_key, setting_value FROM settings");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if (strpos($row['setting_key'], 'key') !== false) {
        echo $row['setting_key'] . " => " . (empty($row['setting_value']) ? "EMPTY" : substr($row['setting_value'], 0, 10) . "...") . "\n";
    } else {
        echo $row['setting_key'] . " => " . $row['setting_value'] . "\n";
    }
}
