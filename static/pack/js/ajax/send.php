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

	$subject_2 = 'Системная работа близко! Ссылка на вебинар 25 мая 20:00 МСК';

	$message2 = "Добрый день, $name!\n";
	$message2 .= "Благодарим за регистрацию на наш вебинар.\n\n";

	$message2 .= "Встречаемся онлайн во вторник 22 мая в 20:00 МСК.\n\n";

	$message2 .= "На встрече мы ответим на вопросы:\n";
	$message2 .= "1. Что делать, если поручения тонут в текучке, а сотрудники срывают сроки и отрывают руководителя от дел в течение дня?\n";
	$message2 .= "2. Как управлять командой сотрудников в условиях хаоса, если планы меняются каждую неделю?\n";
	$message2 .= "3. Как сформулировать цели компании, чтобы они были достижимы и понятны сотрудникам?\n\n";

	$message2 .= "В результате каждый получит:\n";
	$message2 .= "+ перечень простых шагов для контроля поручений сотрудников и заказов клиентов на удобной и бесплатной доске задач,\n";
	$message2 .= "+ простую формулу поручения для делегирования задач сотрудникам,\n";
	$message2 .= "+ регламент планирования и контроля задач вместе с командой сотрудников.\n\n";

	$message2 .= "Чтобы попасть на вебинар, нужно пройти по ссылке за 5 минут до начала, то есть 10 апреля в 19:55. Приходите вовремя.\n";
	$messag_2 .= "http://практика10.рф/вебинар1\n\n";

	$message2 .= "До встречи!\n";
	$message2 .= "Команда ДНК СИСТЕМА\n";

	$to_2 = "$email";
	mail($to_2,$subject_2,$message2,$headers);

};

$to = "system@dnk.bz";
mail($to,$subject,$message,$headers);
$to = "kolmakov.mikhail@gmail.com";
mail($to,$subject,$message,$headers);

echo 'true';
?>