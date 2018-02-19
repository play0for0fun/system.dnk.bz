<?php
$sendto1 = "bev-olga@yandex.ru";
$mail = nl2br($_POST['mail']);
$name  = nl2br($_POST['name']);
$phone  = nl2br($_POST['phone']);
$town  = nl2br($_POST['town']);
$yearsumm  = nl2br($_POST['yearsumm']);
$managervalue  = nl2br($_POST['managervalue']);
$position  = nl2br($_POST['position']);
$type  = nl2br($_POST['type']);

$content = "Форма с сайта system.dnk.bz";

// Формирование заголовка письма
$subject  = $content;
$headers  = "From: dnk.bz@no-replay.ru" . "\r\n";
$headers .= "Reply-To: Без ответа". "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'5>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Форма с сайта system.dnk.bz</h2>\r\n";

$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>E-mail:</strong> ".$mail."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Город:</strong> ".$town."</p>\r\n";
$msg .= "<p><strong>Годовой оборот компании:</strong> ".$yearsumm."</p>\r\n";
$msg .= "<p><strong>Количество менеджеров и руководителей направлений:</strong> ".$managervalue."</p>\r\n";
$msg .= "<p><strong>Должность:</strong> ".$position."</p>\r\n";
$msg .= "<p><strong>Формат программы:</strong> ".$type."</p>\r\n";

$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto1, $subject, $msg, $headers))) {
	echo "true";
} else {
	echo "false";
}

?>



