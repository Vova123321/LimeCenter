<?php>
require_once 'config.php';
// feedback.php

// проверка, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // получение данных из формы
  $experience = $_POST["experience"];
  $work_type = $_POST["worktype"];
  $age = $_POST["yourage"];
  $equipment = $_POST["equipment"];

  $name = $_POST['main__quiz_name'];
  $name_parts = explode(' ', $name);

  if(count($name_parts) != 3) {
      // Если формат имени неправильный, возвращаем ошибку
      http_response_code(400); // Ошибка запроса
      die("Неправильный формат имени.");
  }

  $email = $_POST['main__quiz_email'];
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Если email не проходит валидацию, возвращаем ошибку
      http_response_code(401); // Ошибка запроса
      die("Неправильный формат email.");
  }

  $check_email_query = "SELECT * FROM orders WHERE Email='$email'";
  $check_email_result = $conn->query($check_email_query);
  if ($check_email_result->num_rows > 0) {
      // Если почта уже существует в базе данных, возвращаем ошибку
      http_response_code(409); // Конфликт
      die("Почта уже существует в базе данных.");
  }
  $phone = $_POST['main__quiz_phone'];
  $check_phone_query = "SELECT * FROM orders WHERE Phone='$phone'";
  $check_phone_result = $conn->query($check_phone_query);
  if ($check_phone_result->num_rows > 0) {
      // Если телефон уже существует в базе данных, возвращаем ошибку
      http_response_code(409); // Конфликт
      die("Телефон уже существует в базе данных.");
  }
  $surname = $name_parts[0];
  $first_name = $name_parts[1];
  $patronymic = $name_parts[2];
  $city = $_POST['main__quiz_city'];
  $PhoneCall = 'Нет';

  // добавление данных в таблицу
  $sql = "INSERT INTO orders (Surname, Name, Patronymc, Phone, Email, city, PhoneCall, experience, work_type, age, equipment)
              VALUES ('$surname', '$first_name', '$patronymic', '$phone', '$email', '$city', '$PhoneCall', '$experience', '$work_type', '$age', '$equipment')";

  if ($conn->query($sql) === TRUE) {
      echo "Ваша заявка принята.";
  } else {
      // Если произошла ошибка при добавлении данных в базу данных, возвращаем ошибку
      http_response_code(500); // Внутренняя ошибка сервера
      die("Ошибка при добавлении данных в базу данных: " . $conn->error);
  }

  $conn->close();
}
?>