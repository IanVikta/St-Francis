<?php
// admin/login.php
session_start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || $password === '') {
        $error = 'Please enter both your staff username/email and password.';
    } else {
        // Placeholder authentication feedback when database credentials are not configured
        $error = 'Invalid staff credentials or account not yet activated by the school administrator.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Staff & Admin Portal - St. Francis Day & Boarding Primary School Ntinda</title>
  <link href="../assets/img/favicon.png" rel="icon">
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(16, 42, 31, 0.94), rgba(14, 162, 88, 0.85)), url('../assets/img/education/cover.jpg') center/cover no-repeat;
      padding: 20px;
    }
    .login-card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
      max-width: 440px;
      width: 100%;
      padding: 40px 32px;
    }
    .login-card .school-badge {
      width: 76px;
      height: 76px;
      object-fit: contain;
      margin-bottom: 12px;
    }
    .btn-school {
      background-color: #0ea258;
      border-color: #0ea258;
      color: #fff;
      font-weight: 600;
      padding: 11px 20px;
    }
    .btn-school:hover {
      background-color: #0b8447;
      border-color: #0b8447;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="login-card text-center">
    <a href="../index.html" class="text-decoration-none">
      <img src="../assets/img/bdg.png" alt="St. Francis Primary School Badge" class="school-badge">
    </a>
    <h4 class="fw-bold mb-1">St. Francis P/S - Ntinda</h4>
    <p class="text-muted small mb-4">Staff &amp; Administrator Portal</p>

    <?php if ($error !== ''): ?>
      <div class="alert alert-danger text-start small py-2" role="alert">
        <i class="bi bi-exclamation-circle-fill me-1"></i>
        <?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?>
      </div>
    <?php endif; ?>

    <form method="post" action="login.php" class="text-start">
      <div class="mb-3">
        <label for="username" class="form-label fw-semibold small">Staff Email or ID</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person"></i></span>
          <input type="text" class="form-control" id="username" name="username" placeholder="e.g. staff@stfrancisntinda.sc.ug" required>
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label fw-semibold small">Password</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
        </div>
      </div>
      <div class="d-grid mt-4">
        <button type="submit" class="btn btn-school">
          <i class="bi bi-box-arrow-in-right me-1"></i> Sign In to Portal
        </button>
      </div>
    </form>

    <hr class="my-4">
    <div class="d-flex justify-content-between align-items-center small">
      <a href="../index.html" class="text-decoration-none text-secondary">
        <i class="bi bi-arrow-left me-1"></i> Back to Website
      </a>
      <a href="../contact.html" class="text-decoration-none text-secondary">
        Need IT Help?
      </a>
    </div>
  </div>
</body>
</html>

