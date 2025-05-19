function calcularTMB() {
  const sexo = document.getElementById("sexo").value;
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  const resultadoDiv = document.getElementById("resultado");
  const valorSpan = document.getElementById("tmb-valor");

  if (isNaN(idade) || isNaN(peso) || isNaN(altura)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  let tmb = 0;
  if (sexo === "masculino") {
    tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
  } else {
    tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
  }

  // Atualiza apenas o valor, sem afetar o layout
  valorSpan.textContent = `${tmb.toFixed(2)}`;

  // Garante visibilidade e animação limpa
  resultadoDiv.style.display = "block";
  resultadoDiv.classList.remove("animar-resultado");
  void resultadoDiv.offsetWidth;
  resultadoDiv.classList.add("animar-resultado");
}
