<?php
$contacts = $_POST['contact'];

$name = $contacts['first_name'];
$phone = $contacts['general_phone'];

$summ = $_POST['summ'];

$subject = 'Заявка system.dnk.bz';	

//$headers= "From: noreply <noreply@noreply.ru>\r\n";
//$headers.= "Reply-To: noreply <noreply@noreply.ru>\r\n";
$headers= "X-Mailer: PHP/" . phpversion()."\r\n";
$headers.= "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type: text/plain; charset=utf-8\r\n";

$to = "triowork2@gmail.com";

$message = "Имя: $name\n";
$message .= "Телефон: $phone\n\n";
if(isset($summ)){
	$message .= "Сумма: $summ\n";
}

mail($to,$subject,$message,$headers);


$to = "about@bfstudio.pw";
mail($to,$subject,$message,$headers);
$to = "hangman@i.ua";
mail($to,$subject,$message,$headers);
$to = "bev-olga@yandex.ru";
mail($to,$subject,$message,$headers);

echo 'true';
?>