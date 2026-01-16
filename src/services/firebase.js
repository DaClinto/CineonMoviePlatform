// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA16tG-SeR_wG_RADA8dgN5J-8a9ni44oc",
    authDomain: "onali-54adf.firebaseapp.com",
    projectId: "onali-54adf",
    storageBucket: "onali-54adf.firebasestorage.app",
    messagingSenderId: "422778388688",
    appId: "1:422778388688:web:49df0f1f8ca6e5cc2bded5",
    measurementId: "G-GK0YKG9FFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
