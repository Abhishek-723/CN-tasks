// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- Importing storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMW7XT5rVfuORji75Kw2b2sYozgIJdUgY",
  authDomain: "resume-maker-f23a3.firebaseapp.com",
  projectId: "resume-maker-f23a3",
  storageBucket: "resume-maker-f23a3.appspot.com",
  messagingSenderId: "240796742087",
  appId: "1:240796742087:web:07b7584f1c57977bf0e9e2",
  measurementId: "G-Q8SH1CWYE9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app); // <-- Initializing storage

export { app, auth, db, storage }; // <-- Exporting storage
