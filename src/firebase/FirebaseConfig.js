import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDs962Jh1sH_fkkOtdf2FNlYyomF-4n_F8",
    authDomain: "furniture-flow.firebaseapp.com",
    projectId: "furniture-flow",
    storageBucket: "furniture-flow.firebasestorage.app",
    messagingSenderId: "682821688739",
    appId: "1:682821688739:web:8e7d11625aa74142d7ce16",
    measurementId: "G-CN19TPW0RB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
//set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

export { app, auth, db, googleProvider };
