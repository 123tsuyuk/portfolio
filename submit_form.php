
<?php
function sendToTelegram($chatId, $message, $token) {
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
    $data = array('chat_id' => $chatId, 'text' => $message);
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { /* Handle error */ }
}

// Your Bot Token and Chat ID
$token = '7060741021:AAGSqbOTz3A2vTASIONsNQo0WEqtiwhvKfM';
$chatId = '5540085604';

// Collect data from the form
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Format the message
$telegramMessage = "New Contact Form Submission:\nName: $name\nEmail: $email\nMessage: $message";

// Send the message to Telegram
sendToTelegram($chatId, $telegramMessage, $token);

echo "Message sent!";
?>
