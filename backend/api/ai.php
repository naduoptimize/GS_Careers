<?php
// ============================================
// AI API - Local Ollama Proxy
// ============================================
require_once __DIR__ . '/../config.php';
set_time_limit(360);

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'parse':
        handleParse();
        break;
    default:
        jsonResponse(400, 'Invalid action');
}

function handleParse()
{
    // Ensure request is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(405, 'Method not allowed');
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $prompt = $input['prompt'] ?? '';

    if (empty($prompt)) {
        jsonResponse(400, 'Prompt is required');
    }

    // Retrieve settings from database
    $db = getDB();
    $stmt = $db->prepare("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('ai_provider', 'gemini_api_key', 'gemini_model', 'ollama_server', 'ollama_model')");
    $stmt->execute();
    
    $settings = [];
    while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $settings[$row[0]] = $row[1];
    }

    $aiProvider = $settings['ai_provider'] ?? 'ollama';
    $geminiApiKey = !empty($settings['gemini_api_key']) ? $settings['gemini_api_key'] : (defined('GEMINI_API_KEY') ? GEMINI_API_KEY : '');
    $geminiModel = $settings['gemini_model'] ?? 'gemini-2.5-flash';
    
    // Fall back to config.php constants if not found in database settings
    $defaultOllamaServer = defined('OLLAMA_SERVER') ? OLLAMA_SERVER : 'http://172.16.7.21:11434';
    $defaultOllamaModel = defined('OLLAMA_MODEL') ? OLLAMA_MODEL : 'qwen2.5:7b';
    
    $ollamaServer = !empty($settings['ollama_server']) ? $settings['ollama_server'] : $defaultOllamaServer;
    $ollamaModel = !empty($settings['ollama_model']) ? $settings['ollama_model'] : $defaultOllamaModel;

    if ($aiProvider === 'gemini') {
        if (empty($geminiApiKey)) {
            jsonResponse(400, 'Google Gemini API Key is not configured. Please define it in your portal settings.');
        }

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json'
            ]
        ];

        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent?key={$geminiApiKey}";
        $ch = curl_init($url);
        if ($ch === false) {
            jsonResponse(500, "Failed to initialize curl for Google Gemini API connection.");
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            jsonResponse(500, "Gemini API connection failed: $error");
        }

        if ($httpCode !== 200) {
            $errData = json_decode($response, true);
            $errMessage = $errData['error']['message'] ?? $response;
            jsonResponse(500, "Gemini API returned status $httpCode: $errMessage");
        }

        $data = json_decode($response, true);
        $textResponse = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if (empty($textResponse)) {
            jsonResponse(500, "No structured response content returned from Google Gemini API.", $data);
        }

        jsonResponse(200, 'Success', [
            'response' => $textResponse
        ]);

    } else {
        $payload = [
            'model' => $ollamaModel,
            'prompt' => $prompt,
            'stream' => false,
            'format' => 'json'
        ];

        $ch = curl_init("$ollamaServer/api/generate");
        if ($ch === false) {
            jsonResponse(500, "Failed to initialize curl for Ollama server connection.");
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            jsonResponse(500, "Ollama server connection failed: $error");
        }

        if ($httpCode !== 200) {
            jsonResponse(500, "Ollama server returned HTTP code $httpCode: $response");
        }

        $data = json_decode($response, true);
        if (!isset($data['response'])) {
            jsonResponse(500, "Invalid response structure from Ollama server", $data);
        }

        jsonResponse(200, 'Success', [
            'response' => $data['response']
        ]);
    }
}
