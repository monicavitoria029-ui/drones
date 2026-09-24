const botao = document.getElementById("botaoCuriosidade");

const texto = document.getElementById("curiosidade");


botao.addEventListener("click", function() {

    texto.textContent =
        "Alguns drones conseguem permanecer estáveis no ar usando sensores e sistemas de controle automático.";

    botao.textContent = "Curiosidade exibida!";

});