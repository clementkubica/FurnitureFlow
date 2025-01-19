import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

// Save user data to FireStore
export const saveUserData = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userData = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: new Date(),
  };

  try {
    await setDoc(userRef, userData);
    console.log("User data saved:", userData);
  } catch (error) {
    console.error("Error saving user data:", error.message);
  }
};

// Get user data from Firestore
export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No user data found");
    return null;
  }
};scroll