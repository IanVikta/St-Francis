<?php
// forms/contact.php
header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo 'Please fill in all required fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please enter a valid email address.';
    exit;
}

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$file = $dataDir . DIRECTORY_SEPARATOR . 'messages.json';
$messages = [];
if (file_exists($file)) {
    $decoded = json_decode((string) file_get_contents($file), true);
    if (is_array($decoded)) {
        $messages = $decoded;
    }
}

$messages[] = [
    'id'         => uniqid('msg_', true),
    'name'       => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'email'      => $email,
    'subject'    => htmlspecialchars($subject, ENT_QUOTES, 'UTF-8'),
    'message'    => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
    'created_at' => date('c'),
];

file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

echo 'OK';

