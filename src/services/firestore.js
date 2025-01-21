import { doc, setDoc, getDoc, collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import axios from "axios";
import { use } from "react";

// Save user data to FireStore
export const saveUserData = async (user) => {
  try {
    const res = await axios.post("https://adduser-jbhycjd2za-uc.a.run.app", {
      user_id: user.uid,
      email: user.email,
      photoURL: user.photoUrl
    }, {
      headers: { "Content-Type": "application/json" } 
    })
    console.log("User data saved successfully");
    return res.data.user
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Get conversation by user_id and item_id
export const getConversationByUserAndItem = async (user_id, item_id) => {
  try {
    const inboxCollection = collection(db, "inbox_items")
    const q = query(inboxCollection, where("item_id", "==", item_id), where("users", "array-contains", user_id))
    const qSnapshot = await getDocs(q)
    if (qSnapshot.empty) {
      return null
    }

    const doc = qSnapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  }
  catch(error) {
    console.error(error)
    return null
  }
}

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