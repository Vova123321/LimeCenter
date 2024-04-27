<?php>
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные формы
    $name = $_POST['main__call_name'];
    $name_parts = explode(' ', $name);

    if(count($name_parts) != 3) {
        // Если формат имени неправильный, возвращаем ошибку
        http_response_code(400); // Ошибка запроса
        die("Неправильный формат имени.");
    }

    // Валидация email
    $email = $_POST['main__call_email'];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Если email не проходит валидацию, возвращаем ошибку
        http_response_code(401); // Ошибка запроса
        die("Неправильный формат email.");
    }

    // Проверяем, существует ли уже такой телефон в базе данных
    $phone = $_POST['main__call_phone'];
    $check_phone_query = "SELECT * FROM orders WHERE Phone='$phone'";
    $check_phone_result = $conn->query($check_phone_query);
    if ($check_phone_result->num_rows > 0) {
        // Если телефон уже существует в базе данных, возвращаем ошибку
        http_response_code(409); // Конфликт
        die("Телефон уже существует в базе данных.");
    }

    // Проверяем, существует ли уже такая почта в базе данных
    $check_email_query = "SELECT * FROM orders WHERE Email='$email'";
    $check_email_result = $conn->query($check_email_query);
    if ($check_email_result->num_rows > 0) {
        // Если почта уже существует в базе данных, возвращаем ошибку
        http_response_code(409); // Конфликт
        die("Почта уже существует в базе данных.");
    }

    $surname = $name_parts[0];
    $first_name = $name_parts[1];
    $patronymic = $name_parts[2];
    $city = $_POST['main__call_city'];
    $PhoneCall = 'Да';

    // Пример: сохранение данных в базу данных
    $sql = "INSERT INTO orders (Surname, Name, Patronymc, Phone, Email, city, PhoneCall)
            VALUES ('$surname', '$first_name', '$patronymic', '$phone', '$email', '$city', '$PhoneCall')";

    if ($conn->query($sql) === TRUE) {
        echo "Ваша заявка принята.";
    } else {
        // Если произошла ошибка при добавлении данных в базу данных, возвращаем ошибку
        http_response_code(500); // Внутренняя ошибка сервера
        die("Ошибка при добавлении данных в базу данных: " . $conn->error);
    }

    // Закрытие соединения с базой данных
    $conn->close();
} else {
    // Если запрос не был POST-запросом, возвращаем ошибку
    http_response_code(405); // Метод не поддерживается
    die("Метод запроса не поддерживается.");
}
?>