// Função para capturar dados do usuário
function enviarDadosUsuario() {
    const dadosUsuario = {
        dispositivo: navigator.userAgent,
        navegador: navigator.appName,
        ip: '', // Captura do IP pode ser feita via API externa
        horario: new Date().toISOString(),
        cidade: '' // Captura da cidade pode ser feita via API de geolocalização
    };

    // Envio dos dados para o webhook
    fetch('https://seu-webhook-url.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    })
    .then(data => console.log('Dados enviados com sucesso:', data))
    .catch(error => console.error('Erro:', error));
}

// Chame a função quando necessário
enviarDadosUsuario();
