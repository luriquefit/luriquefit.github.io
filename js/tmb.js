function calcularTMB(event) {
  event.preventDefault();

  const sexo = document.getElementById("sexo").value;
  const idade = parseFloat(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const atividade = parseFloat(document.getElementById("atividade").value);

  let tmbBase;

  if (sexo === "homem") {
    tmbBase = 66 + 13.7 * peso + 5 * altura - 6.8 * idade;
  } else if (sexo === "mulher") {
    tmbBase = 665 + 9.6 * peso + 1.8 * altura - 4.7 * idade;
  } else {
    alert("Selecione o sexo.");
    return;
  }

  const tmbFinal = tmbBase * atividade;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `Seu gasto calórico diário estimado é:<br><strong>${tmbFinal.toFixed(
    1
  )} kcal</strong>`;
  resultado.classList.add("opacity-100");
}
