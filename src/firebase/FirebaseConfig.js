import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDs962Jh1sH_fkkOtdf2FNlYyomF-4n_F8",
    authDomain: "furniture-flow.firebaseapp.com",
    projectId: "furniture-flow",
    storageBucket: "furniture-flow.firebasestorage.app",
    messagingSenderId: "682821688739",
    appId: "1:682821688739:web:8e7d11625aa74142d7ce16",
    measurementId: "G-CN19TPW0RB"
  };

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
