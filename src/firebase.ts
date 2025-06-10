// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCd7gXsKuNbKRiNRkG3ZaAJOyt1QkoZrYM",
    authDomain: "mentome-test.firebaseapp.com",
    projectId: "mentome-test",
    storageBucket: "mentome-test.firebasestorage.app",
    messagingSenderId: "932336537535",
    appId: "1:932336537535:web:55f4f216e79c65f66e1b0a",
    measurementId: "G-Z40D4FDPMQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
