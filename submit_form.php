<?php
require 'vendor/autoload.php';

// This is your SendGrid API Key
$apiKey = 'YOUR_API_KEY_HERE';

$email = new \SendGrid\Mail\Mail();
$email->setFrom("diegoalonsojapan@gmail.com", "Example User Name");
$email->setSubject("Sending with SendGrid is Fun");
$email->addTo("test@example.com", "Example User");
$email->addContent("text/plain", "and easy to do anywhere, even with PHP");
$email->addContent("text/html", "<strong>and easy to do anywhere, even with PHP</strong>");

$sendgrid = new \SendGrid($apiKey);

try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
?>
