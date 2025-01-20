import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

// Save user data to FireStore
export const saveUserData = async (user) => {
  try {
    await setDoc(
        doc(db, "users", user.uid), 
        {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
    },
    { merge: true}
    );
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        console.log("No user document!");
        return {};
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {};
  }
};