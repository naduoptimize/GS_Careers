<?php
$ch = curl_init('http://localhost:8000/api/ai.php?action=quota_status');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
curl_close($ch);
echo $res;
