<?php
// Obtén el título del archivo de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];

// Realiza la lógica para registrar la descarga en la base de datos o archivo
// Aquí, simplemente incrementaremos el contador en el archivo JSON
$jsonFile = 'https://raw.githubusercontent.com/livrasand/Reviw/main/repository/publications.json';
$jsonData = json_decode(file_get_contents($jsonFile), true);

foreach ($jsonData as &$publication) {
    if ($publication['title'] === $title) {
        $publication['descargas']++;
    }
}

file_put_contents($jsonFile, json_encode($jsonData));

// Devuelve el nuevo contador de descargas
echo json_encode(['descargas' => $publication['descargas']]);
?>
