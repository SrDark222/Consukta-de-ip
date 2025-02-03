function consultar() {
    let input = document.getElementById("consultaInput").value;
    let resultado = document.getElementById("resultado");

    if (input === "") {
        resultado.innerHTML = "Digite algo para consultar!";
        resultado.style.color = "red";
    } else {
        resultado.innerHTML = `Resultado encontrado para: <b>${input}</b>`;
        resultado.style.color = "cyan";
    }
}

// Função para buscar informações sobre o IP do usuário
function consultaIP() {
    const ipInfoElement = document.getElementById('ip-info');
    fetch('https://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            // Exibe os dados retornados pela API
            ipInfoElement.innerHTML = `
                <strong>IP:</strong> ${data.query} <br>
                <strong>Cidade:</strong> ${data.city} <br>
                <strong>Região:</strong> ${data.regionName} <br>
                <strong>País:</strong> ${data.country} <br>
                <strong>Organização:</strong> ${data.org} <br>
            `;
        })
        .catch(error => {
            ipInfoElement.innerHTML = 'Erro ao buscar dados do IP.';
            console.error('Erro na consulta da API:', error);
        });
}

// Chama a função de consulta de IP quando o site carrega
window.onload = consultaIP;
