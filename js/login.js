// Inicialização do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAE3RAALT8f2A0JG3DOG2X50zEpUIonCq0",
  authDomain: "luriquefit.firebaseapp.com",
  projectId: "luriquefit",
  storageBucket: "luriquefit.firebasestorage.app",
  messagingSenderId: "1077271243747",
  appId: "1:1077271243747:web:001ac1a73d54012d548ed6",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Seleção dos elementos
const btnLogin = document.getElementById("btnLogin");
const btnCadastro = document.getElementById("btnCadastro");
const mensagem = document.getElementById("mensagem");

// Função de login
btnLogin.addEventListener("click", () => {
  mensagem.textContent = "";
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    mensagem.textContent = "Preencha e-mail e senha.";
    return;
  }

  auth
    .signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((erro) => {
      mensagem.textContent = erro.message;
    });
});

// Função de cadastro
btnCadastro.addEventListener("click", () => {
  mensagem.textContent = "";
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    mensagem.textContent = "Preencha nome, e-mail e senha.";
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).set({
        nome: nome,
        email: email,
        role: "user",
        treino: "",
        aguaHoje: 0,
      });
    })
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((erro) => {
      mensagem.textContent = erro.message;
    });
});
