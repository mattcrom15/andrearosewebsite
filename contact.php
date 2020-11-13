<?php 
$to = 'enquiries@counselling-with-andrea-rose.com';
$email =  $_POST["email"]; 
$name = $_POST["name"]; 
$subject = $name . ' - ' . $_POST["subject"];  
$msg =  $_POST["message"];
$msg = wordwrap($msg,70);
$headers = 'From: ' . $email . "\r\n";
$mail = '';
if ($email != '' && $name != '' && $subject !='' && $msg != ''){
        $mail = mail($to,$subject,$msg,$headers);
        echo true;
} else{
    echo 'message faild';
}
?>

