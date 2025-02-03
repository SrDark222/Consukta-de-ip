<?php
// Captura os dados do usuário
$userData = [
    "name" => $_POST['name'],
    "email" => $_POST['email']
];

// URL do webhook
$webhook_url = "https://example.com/webhook";

// Inicializa a requisição cURL
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($userData))
]);

// Executa a requisição
$response = curl_exec($ch);
curl_close($ch);
?>
