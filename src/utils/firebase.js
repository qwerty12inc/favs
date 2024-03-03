// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtdX2q3pFv0dHjNEsDaicaPnIeDZ4qUiU",
  authDomain: "cofegeo.firebaseapp.com",
  projectId: "cofegeo",
  storageBucket: "cofegeo.appspot.com",
  messagingSenderId: "457717190004",
  appId: "1:457717190004:web:73d76d6892b4c97e017021",
  measurementId: "G-6WQTMHTLM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);