<?php
// send.php - simple form mailer. Edit $to before use.
// NOTE: This is a minimal example. On production, secure & validate inputs, use SMTP library, and protect against header injection.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo "Method Not Allowed";
  exit;
}

$name  = strip_tags(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = strip_tags(trim($_POST['phone'] ?? ''));
$msg   = strip_tags(trim($_POST['message'] ?? ''));

$to = 'your-email@example.com'; // <-- EDIT THIS EMAIL
$subject = "رسالة من موقع الشركة: " . ($name ?: 'زائر');
$body = "الاسم: $name\nالبريد: $email\nالهاتف: $phone\n\nالرسالة:\n$msg\n";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8\r\n";

// Basic validation
if (!$email) {
  header('Location: /contact.html?sent=0&error=invalid_email');
  exit;
}

// Try mail (may require proper server mail setup)
if (mail($to, $subject, $body, $headers)) {
  header('Location: /contact.html?sent=1');
} else {
  header('Location: /contact.html?sent=0');
}
exit;
?>
