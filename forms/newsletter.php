<?php
// forms/newsletter.php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$email = strtolower(trim($_POST['email'] ?? ''));

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$file = $dataDir . DIRECTORY_SEPARATOR . 'newsletter.json';
$subscribers = [];
if (file_exists($file)) {
    $decoded = json_decode((string) file_get_contents($file), true);
    if (is_array($decoded)) {
        $subscribers = $decoded;
    }
}

foreach ($subscribers as $sub) {
    if (($sub['email'] ?? '') === $email) {
        echo json_encode([
            'success' => true,
            'message' => 'You are already subscribed to our school newsletter!'
        ]);
        exit;
    }
}

$subscribers[] = [
    'email'         => $email,
    'subscribed_at' => date('c'),
];

file_put_contents($file, json_encode($subscribers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

echo json_encode([
    'success' => true,
    'message' => 'Thank you for subscribing to the St. Francis Primary School newsletter!'
]);

