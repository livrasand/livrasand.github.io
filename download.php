<?php
// Obtén el título del archivo de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];

// Registra el título recibido en el archivo de registro de errores
error_log("Título recibido: " . $title);

// Depurar
error_log('Solicitud recibida');
error_log('Título recibido: ' . $title);

// Realiza la lógica para registrar la descarga en la base de datos o archivo
// Aquí, simplemente incrementaremos el contador en el archivo JSON
$jsonFile = 'publications.json';
$jsonData = json_decode(file_get_contents($jsonFile), true);

foreach ($jsonData as &$publication) {
    if ($publication['title'] === $title) {
        $publication['descargas']++;
    }
}

file_put_contents($jsonFile, json_encode($jsonData));

// Agrega esta línea para registrar la respuesta
error_log(json_encode(['descargas' => $publication['descargas']]);

// Devuelve el nuevo contador de descargas
echo json_encode(['descargas' => $publication['descargas']]);
?>
