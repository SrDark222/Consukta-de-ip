// Função para consultar o IP
async function consultarIP() {
  const ip = document.getElementById('ip-address').value;
  if (!ip) {
    alert('Por favor, digite um IP válido.');
    return;
  }
  
  document.getElementById('loading').style.display = 'block'; // Mostrar carregando

  try {
    // Solicitação para consultar o IP usando uma API pública
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();

    // Exibir os resultados
    document.getElementById('results').innerHTML = `
      <p><strong>IP:</strong> ${data.ip}</p>
      <p><strong>Org:</strong> ${data.org}</p>
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Country:</strong> ${data.country}</p>
    `;
    
    // Exibir mapa com base na localização
    showMap(data.loc);
  } catch (error) {
    document.getElementById('results').innerHTML = `<p>Erro ao consultar IP</p>`;
  } finally {
    document.getElementById('loading').style.display = 'none'; // Ocultar carregando
  }
}

// Função para mostrar mapa usando a API do Google Maps
function showMap(location) {
  const [latitude, longitude] = location.split(',');
  
  // Criando um mapa com o Google Maps
  const mapOptions = {
    center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    zoom: 10,
    mapTypeId: 'roadmap',
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  const marker = new google.maps.Marker({
    position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    map: map,
    title: 'Localização IP',
  });
}

// Função para trocar o wallpaper
function changeWallpaper() {
  const wallpapers = [
    "wallpaper/1784-thunder-pfpsgg.gif",
    "wallpaper/4852-graveyard-grim-pfpsgg.gif",
    "wallpaper/8007-code-pfpsgg.gif",
    "wallpaper/DUwB.gif",
    "wallpaper/rdk.ney1.gif"
  ];

  let index = 0;
  setInterval(() => {
    document.body.style.backgroundImage = `url(${wallpapers[index]})`;
    index = (index + 1) % wallpapers.length;
  }, 10000); // Trocar a cada 10 segundos
}

// Chama a função para trocar wallpaper ao carregar a página
window.onload = changeWallpaper;
