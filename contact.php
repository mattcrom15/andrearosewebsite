<?php 
    $to = 'enquiries@counselling-with-andrea-rose.com';
    $email =  $_POST["email"]; 
    $name = $_POST["name"]; 
    $subject = $_POST["subject"]; 
    echo $subject;
    $msg =  $_POST["message"];
    echo $msg;
    $headers = 'From: ' . $email . "\r\n";
    mail($to,$subject,$msg,$headers);

?>

