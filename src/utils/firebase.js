// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBRtvin8m4785mQmBjYg71GfyAbikV8qY",
  authDomain: "articlehub-4999d.firebaseapp.com",
  projectId: "articlehub-4999d",
  storageBucket: "articlehub-4999d.firebasestorage.app",
  messagingSenderId: "813612161357",
  appId: "1:813612161357:web:690ce523878b929449ff04",
  measurementId: "G-5ZWT4EZ504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);