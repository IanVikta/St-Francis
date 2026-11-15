<?php
// forms/admission_submit.php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$requiredFields = [
    'student_first_name'      => 'Student First Name',
    'student_last_name'       => 'Student Last Name',
    'student_dob'             => 'Date of Birth',
    'student_gender'          => 'Gender',
    'student_nationality'     => 'Nationality',
    'student_address'         => 'Home Address',
    'student_grade'           => 'Grade/Class Applying For',
    'guardian1_fullname'      => 'Primary Guardian Name',
    'guardian1_relationship'  => 'Guardian Relationship',
    'guardian1_phone_primary' => 'Guardian Primary Phone',
    'guardian1_email'         => 'Guardian Email',
    'emergency_fullname'      => 'Emergency Contact Name',
    'emergency_phone_primary' => 'Emergency Contact Phone',
    'emergency_address'       => 'Emergency Contact Address',
    'immunization_status'     => 'Immunization Status',
    'parent_signature'        => 'Parent/Guardian Signature',
    'signature_date'          => 'Signature Date',
];

foreach ($requiredFields as $field => $label) {
    if (trim((string) ($_POST[$field] ?? '')) === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Please fill in the required field: {$label}."]);
        exit;
    }
}

if (!filter_var(trim($_POST['guardian1_email']), FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address for the primary guardian.']);
    exit;
}

$uploadDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'docs';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
$maxFileSize = 5 * 1024 * 1024; // 5 MB per file
$uploadedFiles = [];

function processSingleUpload(array $fileInfo, string $uploadDir, array $allowedExtensions, int $maxFileSize, string $prefix): ?string {
    if (($fileInfo['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if ($fileInfo['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Error uploading file: ' . ($fileInfo['name'] ?? 'document'));
    }
    if ($fileInfo['size'] > $maxFileSize) {
        throw new RuntimeException('File exceeds 5MB limit: ' . ($fileInfo['name'] ?? 'document'));
    }
    $ext = strtolower(pathinfo($fileInfo['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExtensions, true)) {
        throw new RuntimeException('Invalid file type for ' . ($fileInfo['name'] ?? 'document') . '. Allowed: PDF, JPG, PNG.');
    }
    $safeName = $prefix . '_' . bin2hex(random_bytes(8)) . '.' . $ext;
    $destPath = $uploadDir . DIRECTORY_SEPARATOR . $safeName;
    if (!move_uploaded_file($fileInfo['tmp_name'], $destPath)) {
        throw new RuntimeException('Failed to save uploaded file.');
    }
    return 'uploads/docs/' . $safeName;
}

$fileFields = [
    'proof_of_age',
    'proof_of_residence',
    'academic_records',
    'medical_records',
    'identification',
    'special_needs_report',
    'legal_documents',
];

try {
    foreach ($fileFields as $field) {
        if (!isset($_FILES[$field])) {
            continue;
        }
        $fileData = $_FILES[$field];
        if (is_array($fileData['name'])) {
            $savedList = [];
            $count = count($fileData['name']);
            for ($i = 0; $i < $count; $i++) {
                $single = [
                    'name'     => $fileData['name'][$i],
                    'type'     => $fileData['type'][$i],
                    'tmp_name' => $fileData['tmp_name'][$i],
                    'error'    => $fileData['error'][$i],
                    'size'     => $fileData['size'][$i],
                ];
                $saved = processSingleUpload($single, $uploadDir, $allowedExtensions, $maxFileSize, $field);
                if ($saved !== null) {
                    $savedList[] = $saved;
                }
            }
            if (!empty($savedList)) {
                $uploadedFiles[$field] = $savedList;
            }
        } else {
            $saved = processSingleUpload($fileData, $uploadDir, $allowedExtensions, $maxFileSize, $field);
            if ($saved !== null) {
                $uploadedFiles[$field] = $saved;
            }
        }
    }
} catch (RuntimeException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}

$sanitizedPost = [];
foreach ($_POST as $key => $val) {
    if (is_string($val)) {
        $sanitizedPost[$key] = htmlspecialchars(trim($val), ENT_QUOTES, 'UTF-8');
    }
}

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$admissionsFile = $dataDir . DIRECTORY_SEPARATOR . 'admissions.json';
$applications = [];
if (file_exists($admissionsFile)) {
    $decoded = json_decode((string) file_get_contents($admissionsFile), true);
    if (is_array($decoded)) {
        $applications = $decoded;
    }
}

$refNumber = 'SFP-' . date('Y') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

$applications[] = [
    'reference'    => $refNumber,
    'submitted_at' => date('c'),
    'applicant'    => $sanitizedPost,
    'documents'    => $uploadedFiles,
];

file_put_contents($admissionsFile, json_encode($applications, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

echo json_encode([
    'success'   => true,
    'reference' => $refNumber,
    'message'   => "Application submitted successfully! Your reference number is {$refNumber}. Our Admissions Office will contact you shortly."
]);

