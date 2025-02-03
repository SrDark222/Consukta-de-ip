// Função de consulta (campo de texto)
function consultar() {
    const input = document.getElementById("consultaInput").value;
    const resultado = document.getElementById("resultado");

    if (input === "") {
        resultado.innerHTML = "Digite um IP para consultar!";
        resultado.style.color = "red";
    } else {
        resultado.innerHTML = `Resultado encontrado para: <b>${input}</b>`;
        resultado.style.color = "cyan";
        carregarDadosIP();
    }
}

// Função de Carregar Dados IP
function carregarDadosIP() {
    const loading = document.getElementById("loading");
    const infoScroll = document.getElementById("infoScroll");
    loading.style.display = "block"; // Exibe o loading
    setTimeout(() => {
        consultaIP();
        loading.style.display = "none"; // Esconde o loading após 10 segundos
        infoScroll.style.display = "block"; // Exibe a área de resultados
    }, 10000); // 10 segundos de espera para simular carregamento
}

// Função para consultar o IP via API
function consultaIP() {
    const ipInfoElement = document.getElementById('ip-info');
    fetch('https://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            if (data.status === "fail") {
                ipInfoElement.innerHTML = 'Erro ao obter dados do IP.';
                return;
            }
            ipInfoElement.innerHTML = `
                <strong>IP:</strong> ${data.query} <br>
                <strong>Cidade:</strong> ${data.city} <br>
                <strong>Região:</strong> ${data.regionName} <br>
                <strong>País:</strong> ${data.country} <br>
                <strong>Latitude:</strong> ${data.lat} <br>
                <strong>Longitude:</strong> ${data.lon} <br>
                <strong>Organização:</strong> ${data.org} <br>
            `;
            initMap(data.lat, data.lon, data.city);
        })
        .catch(error => {
            ipInfoElement.innerHTML = 'Erro ao buscar dados do IP.';
            console.error('Erro na consulta da API:', error);
        });
}

// Inicializa o Google Maps
function initMap(lat, lon, city) {
    const mapOptions = {
        center: { lat: lat, lng: lon },
        zoom: 10,
        mapTypeId: 'roadmap'
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
        title: city
    });
}

// Funções para mostrar as informações
function mostrarIpInfo() {
    document.getElementById("ip-info").style.display = "block";
    document.getElementById("map").style.display = "none";
}

function mostrarLocalizacao() {
    document.getElementById("ip-info").style.display = "none";
    document.getElementById("map").style.display = "block";
}

function mostrarEndereco() {
    document.getElementById("ip-info").style.display = "block";
    document.getElementById("map").style.display = "block";
}
