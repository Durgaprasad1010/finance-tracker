// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3jY1OCL0XIn_KJ5WTZ9AAofQMeygrsHY",
    authDomain: "personal-finance-tracker-3003d.firebaseapp.com",
    projectId: "personal-finance-tracker-3003d",
    storageBucket: "personal-finance-tracker-3003d.appspot.com",
    messagingSenderId: "315404760612",
    appId: "1:315404760612:web:ee42975574880bf8ca0ab1",
    measurementId: "G-NQ94PRST6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };