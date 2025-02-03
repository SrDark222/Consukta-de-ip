document.getElementById('consultarBtn').addEventListener('click', function() {
    const ip = document.getElementById('ipInput').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!validarIP(ip)) {
        resultadoDiv.innerHTML = '<p style="color: red;">Endereço IP inválido. Tente novamente.</p>';
        return;
    }

    consultarIP(ip);
});

function validarIP(ip) {
    const padraoIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return padraoIP.test(ip);
}

function consultarIP(ip) {
    fetch(`https://ipinfo.io/${ip}/json?token=890f28f37c804d`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar IP');
            }
            return response.json();
        })
        .then(data => {
            exibirResultado(data);
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function exibirResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Informações sobre o IP ${data.ip}:</h3>
        <p><strong>Cidade:</strong> ${data.city || 'N/A'}</p>
        <p><strong>Região:</strong> ${data.region || 'N/A'}</p>
        <p><strong>País:</strong> ${data.country || 'N/A'}</p>
        <p><strong>Localização:</strong> ${data.loc || 'N/A'}</p>
        <p><strong>Organização:</strong> ${data.org || 'N/A'}</p>
        <p><strong>Código Postal:</strong> ${data.postal || 'N/A'}</p>
    `;
}
