// Função de consulta (campo de texto)
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

// Função para buscar IP e outras informações
function consultaIP() {
    const ipInfoElement = document.getElementById('ip-info');
    fetch('https://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            // Exibe as informações do IP
            ipInfoElement.innerHTML = `
                <strong>IP:</strong> ${data.query} <br>
                <strong>Cidade:</strong> ${data.city} <br>
                <strong>Região:</strong> ${data.regionName} <br>
                <strong>País:</strong> ${data.country} <br>
                <strong>Latitude:</strong> ${data.lat} <br>
                <strong>Longitude:</strong> ${data.lon} <br>
                <strong>Organização:</strong> ${data.org} <br>
            `;
            initMap(data.lat, data.lon, data.city); // Passa a latitude e longitude para o mapa
        })
        .catch(error => {
            ipInfoElement.innerHTML = 'Erro ao buscar dados do IP.';
            console.error('Erro na consulta da API:', error);
        });
}

// Inicializa o mapa com o Google Maps
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

// Troca o fundo a cada 10 segundos (imagens/gifs/vídeos)
const backgrounds = [
    'https://link-da-imagem-1.jpg', 
    'https://link-da-imagem-2.gif', 
    'https://link-do-video-3.mp4'
];

let backgroundIndex = 0;

function changeBackground() {
    document.body.style.background = `url(${backgrounds[backgroundIndex]}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
    backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
}

// Chama a troca de fundo a cada 10 segundos
setInterval(changeBackground, 10000);

// Chama a consulta de IP quando a página carregar
window.onload = () => {
    consultaIP();
    changeBackground();
};
