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
    fetch(`https://ipinfo.io/${ip}/json?token=YOUR_API_TOKEN`)
