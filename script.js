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
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultados para ${data.ip}</h2>
            <p><strong>Localização:</strong> ${data.city}, ${data.region}, ${data.country}</p>
            <p><strong>ISP:</strong> ${data.org}</p>
            <p><strong>Hostname:</strong> ${data.hostname}</p>
        `;
    })
    .catch(error => {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}
