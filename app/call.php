<?php
// переменная для сохранения результата
$data='';
// переберём массив $_POST
foreach ($_POST as $key => $value) {
  // добавим в переменную $data имя и значение ключа
  $data .= $key . ' = ' . $value . '';
}
// выведим результат
echo $data;
?>