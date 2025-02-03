document.getElementById('consultarBtn').addEventListener('click', function() {
    const ip = document.getElementById('ipInput').value;
    const resultadoDiv = document.getElementById('resultado');

    // Valida o IP inserido
    if (!validarIP(ip)) {
        resultadoDiv.innerHTML = '<p style="color: red;">Endereço IP inválido. Tente novamente.</p>';
        return;
    }

    // Consulta o IP
    consultarIP(ip);
});

// Função para validar o formato do IP
function validarIP(ip) {
    const padraoIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return padraoIP.test(ip);
}

// Função para consultar informações do IP
function consultarIP(ip) {
    fetch(`https://ipinfo.io/${ip}/json?token=890f28f37c804d`)
    .then(response => {
        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error('Erro na consulta do IP');
        }
        return response.json();
    })
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        // Exibe os resultados da consulta
        resultadoDiv.innerHTML = `
            <h3>Resultados da Consulta:</h3>
            <p><strong>IP:</strong> ${data.ip}</p>
            <p><strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country}</p>
            <p><strong>ISP:</strong> ${data.org}</p>
        `;
    })
    .catch(error => {
        const resultadoDiv = document.getElementById('resultado');
        // Exibe mensagem de erro
        resultadoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
