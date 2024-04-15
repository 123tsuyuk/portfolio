<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    $recaptcha_secret = "your_secret_key_here";
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Verify the CAPTCHA response
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    $captcha_success = json_decode($verify);
    if ($captcha_success->success == false) {
        // Verification failure
        echo "You are a robot. If not, go back and try again.";
        exit;
    }

    // Email subject and content
    $subject = "New Contact from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Recipient email
    $recipient = "diegoalonsojapan@gmail.com";  // Update this to correct email address

    // Headers
    $headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $headers)) {
        echo "Thank You! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    // Not a POST request
    echo "There was a problem with your submission, please try again.";
}
?>
