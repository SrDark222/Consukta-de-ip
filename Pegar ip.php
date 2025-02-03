<?php
// Captura o IP do visitante
$ip = $_SERVER['REMOTE_ADDR'];

// Configura o webhook do Discord
$webhook_url = "https://discord.com/api/webhooks/1279974604622008454/tLibeCCFysq30-iXKEB1jUk0jCagLm6Q6c8ASxPQMbqf-NWACdCVS-PvL_YsL8tvnutB";

// Cria a mensagem a ser enviada
$data = [
    "content" => "Novo acesso ao site: " . $ip
];

// Inicializa a requisição cURL
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen(json_encode($data))
]);

// Executa a requisição
$response = curl_exec($ch);
curl_close($ch);
?>
