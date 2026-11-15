<?php
// forms/schedule_tour.php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$date    = trim($_POST['date'] ?? '');
$time    = trim($_POST['time'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $date === '' || $time === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required tour booking fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$file = $dataDir . DIRECTORY_SEPARATOR . 'tours.json';
$tours = [];
if (file_exists($file)) {
    $decoded = json_decode((string) file_get_contents($file), true);
    if (is_array($decoded)) {
        $tours = $decoded;
    }
}

$tours[] = [
    'id'         => uniqid('tour_', true),
    'name'       => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
    'email'      => $email,
    'phone'      => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'date'       => htmlspecialchars($date, ENT_QUOTES, 'UTF-8'),
    'time'       => htmlspecialchars($time, ENT_QUOTES, 'UTF-8'),
    'message'    => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
    'created_at' => date('c'),
];

file_put_contents($file, json_encode($tours, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

echo json_encode([
    'success' => true,
    'message' => 'Your campus tour has been scheduled! Our admissions office will contact you to confirm.'
]);

