// Menu Lateral Interativo
const heartMenu = document.getElementById("heartMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

heartMenu.addEventListener("click", function () {
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", function () {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".side-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

//Customisar o Login / Cadastrar do Firebase
firebase.auth().onAuthStateChanged((user) => {
  const linkLogin = document.getElementById("linkLogin");
  if (user) {
    // Se estiver logado, mostra "Ver meu treino"
    linkLogin.textContent = "Ver meu treino";
    linkLogin.href = "home.html";
  } else {
    // Se não estiver logado, mostra "Login / Cadastrar"
    linkLogin.textContent = "Login / Cadastrar";
    linkLogin.href = "login.html";
  }
});
