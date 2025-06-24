<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form inputs
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Define email parameters
    $to = "your-email@example.com";  // Replace with your email address
    $subject = "Inquiry from Website: $name";
    $body = "You have received an inquiry from your website.\n\n".
            "Name: $name\n".
            "Email: $email\n".
            "Message: \n$message";

    // Set the email headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your inquiry! We will get back to you shortly.";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
