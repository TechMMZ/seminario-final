// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZDd6IDAY5NIUMyiDcQLyWSA2516F5R-8",
    authDomain: "quickdelivery-2f8ef.firebaseapp.com",
    projectId: "quickdelivery-2f8ef",
    storageBucket: "quickdelivery-2f8ef.firebasestorage.app",
    messagingSenderId: "804296590807",
    appId: "1:804296590807:web:60fcedf19ddff0ff273792"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, addDoc, collection, auth };