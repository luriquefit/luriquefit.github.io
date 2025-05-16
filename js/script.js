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
