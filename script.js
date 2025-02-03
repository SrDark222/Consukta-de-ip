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
