<?php
$_POST = json_decode(file_get_contents("php://input"), true);                  // Чтобы php мог кушать JSON файлы
echo var_dump($_POST);