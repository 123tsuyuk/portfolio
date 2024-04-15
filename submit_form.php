<?php
require 'vendor/autoload.php';

use Google\Cloud\RecaptchaEnterprise\V1\RecaptchaEnterpriseServiceClient;
use Google\Cloud\RecaptchaEnterprise\V1\Event;
use Google\Cloud\RecaptchaEnterprise\V1\Assessment;

function create_assessment_and_send_email($recaptchaKey, $token, $project, $action, $emailData) {
    $client = new RecaptchaEnterpriseServiceClient();
    $projectName = $client->projectName($project);
    $event = (new Event())
        ->setSiteKey($recaptchaKey)
        ->setToken($token);

    $assessment = (new Assessment())
        ->setEvent($event);

    try {
        $response = $client->createAssessment($projectName, $assessment);
        if (!$response->getTokenProperties()->getValid()) {
            throw new Exception('Invalid token.');
        }
        if ($response->getTokenProperties()->getAction() !== $action) {
            throw new Exception('Action mismatch.');
        }
        $riskScore = $response->getRiskAnalysis()->getScore();
        if ($riskScore < 0.5) {
            throw new Exception('Challenge risk score too low.');
        }

        // If CAPTCHA verification passes, send the email
        send_email($emailData);

    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

function send_email($emailData) {
    $to = 'diegoalonsojapan@gmail.com'; // where the email will send
    $subject = 'New Contact Message from ' . $emailData['name'];
    $message = "You have received a new message from your website contact form.\n\n";
    $message .= "Here are the details:\n";
    $message .= "Name: " . $emailData['name'] . "\n";
    $message .= "Email: " . $emailData['email'] . "\n";
    $message .= "Message:\n" . $emailData['message'] . "\n";

    $headers = 'From: ' . $emailData['email'] . "\r\n";
    $headers .= 'Reply-To: ' . $emailData['email'] . "\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo 'Thank you for contacting us!';
    } else {
        throw new Exception('Failed to send email.');
    }
}

// Collect data from form
$name = htmlspecialchars(stripslashes(trim($_POST['name'])));
$email = htmlspecialchars(stripslashes(trim($_POST['email'])));
$message = htmlspecialchars(stripslashes(trim($_POST['message'])));
$token = $_POST['g-recaptcha-response'];
$action = 'submit'; // The action you expect from the reCAPTCHA tag

$emailData = array(
    'name' => $name,
    'email' => $email,
    'message' => $message
);

// Call the function
create_assessment_and_send_email(
    '6LclE7spAAAAAHpKHV64JUtfL-8FBeP5UxIXd0ta', // Replace with your site key
    $token,
    'watanabetsuuko-1713181021076', // Replace with your Google Cloud project ID
    $action,
    $emailData
);
?>
