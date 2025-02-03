// Função para consultar o IP usando a API ip-api.com
function consultarIP() {
  var ip = document.getElementById('ip-address').value;
  var loadingElement = document.getElementById('loading');
  var resultsElement = document.getElementById('results');
  
  // Exibir o gif de carregamento
  loadingElement.style.display = 'block';
  resultsElement.innerHTML = '';

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
      resultsElement.innerHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>País:</strong> ${data.country}</p>
        <p><strong>Região:</strong> ${data.region}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>ISP:</strong> ${data.isp}</p>
      `;
    })
    .catch(error => {
      loadingElement.style.display = 'none';
      resultsElement.innerHTML = `<p>Erro na requisição: ${error.message}</p>`;
    });
}

// Função para gerar um HWID
function gerarHWID() {
  var hwid = "HWID-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  var hwidResultElement = document.getElementById('hwid-result');
  hwidResultElement.innerHTML = `<p><strong>Seu HWID: </strong>${hwid}</p>`;
}
