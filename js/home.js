 const firebaseConfig = {
    apiKey: "AIzaSyAE3RAALT8f2A0JG3DOG2X50zEpUIonCq0",
    authDomain: "luriquefit.firebaseapp.com",
    projectId: "luriquefit",
    storageBucket: "luriquefit.firebasestorage.app",
    messagingSenderId: "1077271243747",
    appId: "1:1077271243747:web:001ac1a73d54012d548ed6"
  };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }

      const userRef = db.collection("users").doc(user.uid);

      // Escuta em tempo real atualizações no documento do usuário
      userRef.onSnapshot(doc => {
        if (doc.exists) {
          const dados = doc.data();
          document.getElementById("userNome").textContent = dados.nome || user.email;
          document.getElementById("treino").textContent = dados.treino || "Nenhum treino atribuído ainda.";
          document.getElementById("agua").textContent = `${dados.aguaHoje || 0} copos`;
        } else {
          document.getElementById("userNome").textContent = user.email;
          document.getElementById("treino").textContent = "Usuário sem dados.";
          document.getElementById("agua").textContent = "0 copos";
        }
      });
    });

    function beberAgua() {
      const user = auth.currentUser;
      const userRef = db.collection("users").doc(user.uid);

      userRef.update({
        aguaHoje: firebase.firestore.FieldValue.increment(1)
      }).catch(err => {
        alert("Erro ao atualizar água: " + err.message);
      });
    }

    function removerAgua() {
      const user = auth.currentUser;
      const userRef = db.collection("users").doc(user.uid);

      userRef.get().then(doc => {
        if (doc.exists) {
          const atual = doc.data().aguaHoje || 0;
          if (atual > 0) {
            userRef.update({
              aguaHoje: firebase.firestore.FieldValue.increment(-1)
            }).catch(err => {
              alert("Erro ao atualizar água: " + err.message);
            });
          }
        }
      });
    }

    function logout() {
      auth.signOut().then(() => {
        window.location.href = "login.html";
      });
    }

    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;

    firebase.firestore().collection("users").doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const treinoURL = userData.treino;

          if (treinoURL) {
            document.getElementById("btnTreino").href = treinoURL;
          } else {
            document.getElementById("btnTreino").textContent = "Treino não disponível";
            document.getElementById("btnTreino").classList.remove("btn-primary");
            document.getElementById("btnTreino").classList.add("btn-secondary");
          }
        }
      });
  } else {
    window.location.href = "login.html";
  }
});