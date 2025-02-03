// Função para consultar o IP usando a API ip-api.com
function consultarIP() {
  var ip = document.getElementById('ip-address').value;
  var loadingElement = document.getElementById('loading');
  var resultsElement = document.getElementById('results');
  var ipInfoElement = document.getElementById('ip-info');
  var locationInfoElement = document.getElementById('location-info');
  
  // Exibir o gif de carregamento
  loadingElement.style.display = 'block';
  resultsElement.innerHTML = '';
  ipInfoElement.innerHTML = '';
  locationInfoElement.innerHTML = '';

  // Verifica se o campo de IP está vazio
  if (!ip) {
    alert("Digite um IP para consultar!");
    loadingElement.style.display = 'none';
    return;
  }

  // API para consulta do IP
  var url = `http://ip-api.com/json/${ip}?fields=country,region,city,isp,lat,lon`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Esconde o gif de carregamento
      loadingElement.style.display = 'none';
      
      // Verifica se houve algum erro na consulta
      if (data.status === 'fail') {
        resultsElement.innerHTML = `<p>Erro ao consultar o IP.</p>`;
        return;
      }

      // Exibe os dados do IP
      ipInfoElement.innerHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>País:</strong> ${data.country}</p>
        <p><strong>Região:</strong> ${data.region}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>ISP:</strong> ${data.isp}</p>
      `;
      
      // Exibe as informações de localização (latitude e longitude)
      locationInfoElement.innerHTML = `
        <p><strong>Latitude:</strong> ${data.lat}</p>
        <p><strong>Longitude:</strong> ${data.lon}</p>
      `;

      // Mostrar o mapa usando o Google Maps
      initMap(data.lat, data.lon);
    })
    .catch(error => {
      loadingElement.style.display = 'none';
      resultsElement.innerHTML = `<p>Erro na requisição: ${error.message}</p>`;
    });
}

// Função para inicializar o mapa com base na latitude e longitude
function initMap(lat, lon) {
  // Inicializando o mapa
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lon },
    zoom: 10,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      }
    ]
  });

  // Adicionando um marcador no mapa
  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map,
    title: "Localização do IP"
  });
}
