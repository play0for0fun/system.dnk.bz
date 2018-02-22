<?php
$form = $_POST['form'];
$contacts = $_POST['contact'];

$name = $contacts['first_name'];
$phone = $contacts['general_phone'];
$email = $contacts['email'];

$deal = $_POST['deal'];

$sum = $deal['custom_24915'];
$menegers = $deal['custom_24917'];
$position = $deal['custom_24916'];
$type = $deal['custom_24918'];
$expirience = $deal['custom_25071'];

$subject = 'Заявка system.dnk.bz';	

$headers= "X-Mailer: PHP/" . phpversion()."\r\n";
$headers.= "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type: text/plain; charset=utf-8\r\n";

$message = "Форма: $form\n";
$message .= "Имя: $name\n";
if(isset($phone)){
	$message .= "Телефон: $phone\n";
};
if(isset($email)){
	$message .= "E-mail: $email\n\n";
};

if(isset($email)){
	$message .= "Годовой оборот компании: $sum\n";
};
if(isset($email)){
	$message .= "Количество руководителей: $menegers\n";
};
if(isset($email)){
	$message .= "Должность обратившегося: $position\n";
};
if(isset($type)){
	$message .= "Формат программы: $type\n";
};
if(isset($expirience)){
	$message .= "Опыт в бизнесе: $expirience\n";
};

$to = "system@dnk.bz";
mail($to,$subject,$message,$headers);
$to = "kolmakov.mikhail@gmail.com";
mail($to,$subject,$message,$headers);

echo 'true';
?>