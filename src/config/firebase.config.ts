import { initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9yQYTWuSldM2S8aeq0gB8hzmEUc2r8i8",
    authDomain: "ukukg-4e49d.firebaseapp.com",
    projectId: "ukukg-4e49d",
    storageBucket: "ukukg-4e49d.appspot.com",
    messagingSenderId: "1069806323349",
    appId: "1:1069806323349:web:97687e793c6dbf0afa3d9c",
    measurementId: "G-RDE5ZGJ86K",
};

let authentication;
let authProvider;

if (typeof window !== "undefined") {
    // Выполняется только в браузере
    const app = initializeApp(firebaseConfig);
    authentication = getAuth(app);
    authProvider = new PhoneAuthProvider(authentication);
}

export { authentication, authProvider };