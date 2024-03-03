// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm6_Anp_qZhxTyhg_FbaYA4A4Y5mm3Z8A",
  authDomain: "favs-85f44.firebaseapp.com",
  projectId: "favs-85f44",
  storageBucket: "favs-85f44.appspot.com",
  messagingSenderId: "1076432211496",
  appId: "1:1076432211496:web:0035fa99ac28c729f4ef1d",
  measurementId: "G-68E8CSFG9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app)