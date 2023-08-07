// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Due to security reasons, move config to .env file
const firebaseConfig = {
  apiKey: "AIzaSyA91INSRj9OA1NG17sutBCYmN_1PDdf8Iw",
  authDomain: "budgetly-prod-b6756.firebaseapp.com",
  projectId: "budgetly-prod-b6756",
  storageBucket: "budgetly-prod-b6756.appspot.com",
  messagingSenderId: "187719029071",
  appId: "1:187719029071:web:02588a5213f848c6d2b53a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);