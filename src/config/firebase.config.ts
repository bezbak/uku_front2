import { initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider, Auth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA9yQYTWuSldM2S8aeq0gB8hzmEUc2r8i8",
    authDomain: "ukukg-4e49d.firebaseapp.com",
    projectId: "ukukg-4e49d",
    storageBucket: "ukukg-4e49d.appspot.com",
    messagingSenderId: "1069806323349",
    appId: "1:1069806323349:web:97687e793c6dbf0afa3d9c",
    measurementId: "G-RDE5ZGJ86K",
};

// Initialize Firebase App (Ensure it's only initialized once)
const app = initializeApp(firebaseConfig);

// Lazy-initialize authentication and provider on the client-side
let authentication: Auth | null = null;
let authProvider: PhoneAuthProvider | null = null;

if (typeof window !== "undefined") {
    authentication = getAuth(app);
    authProvider = new PhoneAuthProvider(authentication);
}

export { authentication, authProvider };