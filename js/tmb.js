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
    // Fórmula Harris-Benedict para homens
    tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade;
  } else {
    // Fórmula Harris-Benedict para mulheres
    tmb = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * idade;
  }

  valorSpan.textContent = tmb.toFixed(2);

  resultadoDiv.style.display = "block";
  resultadoDiv.classList.remove("animar-resultado");
  void resultadoDiv.offsetWidth; // força reflow
  resultadoDiv.classList.add("animar-resultado");
}
