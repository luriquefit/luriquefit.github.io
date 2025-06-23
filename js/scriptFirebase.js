  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAE3RAALT8f2A0JG3DOG2X50zEpUIonCq0",
    authDomain: "luriquefit.firebaseapp.com",
    projectId: "luriquefit",
    storageBucket: "luriquefit.firebasestorage.app",
    messagingSenderId: "1077271243747",
    appId: "1:1077271243747:web:001ac1a73d54012d548ed6"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();