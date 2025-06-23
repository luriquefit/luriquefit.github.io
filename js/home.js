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

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = db.collection("users").doc(user.uid);

  // Escuta em tempo real atualizações no documento do usuário
  userRef.onSnapshot((doc) => {
    if (doc.exists) {
      const dados = doc.data();
      document.getElementById("userNome").textContent =
        dados.nome || user.email;
      document.getElementById("treino").textContent =
        dados.treino || "Nenhum treino atribuído ainda.";
      document.getElementById("agua").textContent = `${
        dados.aguaHoje || 0
      } copos`;
    } else {
      document.getElementById("userNome").textContent = user.email;
      document.getElementById("treino").textContent = "Usuário sem dados.";
      document.getElementById("agua").textContent = "0 copos";
    }
  });
});

const slider = document.getElementById("sliderAgua");
const valorTexto = document.getElementById("valorAgua");
const nivelGarrafa = document.getElementById("nivelGarrafa");

// Atualiza a altura visual da água
function atualizarGarrafa(valor) {
  const porcentagem = (valor / 3000) * 100;
  nivelGarrafa.style.height = `${porcentagem}%`;
  valorTexto.textContent = valor;
}

// Carrega valor do Firebase
auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = db.collection("users").doc(user.uid);

    userRef.get().then((doc) => {
      const dados = doc.data();
      const hoje = new Date().toISOString().slice(0, 10);

      if (dados.ultimaAtualizacaoAgua !== hoje) {
        userRef.update({ aguaHoje: 0, ultimaAtualizacaoAgua: hoje });
        slider.value = 0;
        atualizarGarrafa(0);
      } else {
        const atual = dados.aguaHoje || 0;
        slider.value = atual;
        atualizarGarrafa(atual);
      }
    });

    // Quando usuário arrasta o slider
    slider.addEventListener("input", () => {
      const valor = parseInt(slider.value);
      atualizarGarrafa(valor);

      const hoje = new Date().toISOString().slice(0, 10);
      db.collection("users").doc(user.uid).update({
        aguaHoje: valor,
        ultimaAtualizacaoAgua: hoje,
      });
    });
  }
});
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const treinoURL = userData.treino;

          const btnTreino = document.getElementById("btnTreino");

          if (treinoURL && treinoURL.trim() !== "") {
            btnTreino.href = treinoURL;
            btnTreino.classList.remove("btn-secondary");
            btnTreino.classList.add("btn-primary");
            btnTreino.textContent = "Baixar PDF";
            btnTreino.onclick = null;
          } else {
            btnTreino.href = "#";
            btnTreino.classList.remove("btn-primary");
            btnTreino.classList.add("btn-secondary");
            btnTreino.textContent = "Treino não disponível";
            btnTreino.onclick = (e) => {
              e.preventDefault();
              alert("Seu treino ainda não foi atribuído.");
            };
          }
        }
      });
  } else {
    window.location.href = "login.html";
  }
});
