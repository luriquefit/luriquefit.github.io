import { initializeApp } from "firebase/app";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-V-ZjAvKsK2972BBGyq0fcGcWjwH0pR4",
  authDomain: "luisriquefit.firebaseapp.com",
  projectId: "luisriquefit",
  storageBucket: "luisriquefit.firebasestorage.app",
  messagingSenderId: "744919749403",
  appId: "1:744919749403:web:0e0ce88e388a178555b9be",
  measurementId: "G-NS48N1CMQ4"
};

// Inicializa o Firebase
export const app = initializeApp(firebaseConfig);
