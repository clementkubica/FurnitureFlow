import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import axios from "axios";
import { saveUserData } from "./firestore";

// Create a Context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [authLoading, setAuthLoading] = useState(true); // Loading state

  const getUserById = async (user_id) => {
    try {
      const res = await axios.post("https://fetchuserbyid-jbhycjd2za-uc.a.run.app", {
        user_id: user_id
      },
      { 
        headers: { "Content-Type": "application/json" } 
      })

      return res.data.user
    }
    catch(error) {
      return null
    }
  }


  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if the email ends with "@u.northwestern.edu"
        if (currentUser.email.endsWith("@u.northwestern.edu")) {
          // Fetch additional user data from Firestore if needed
          
          const userData = await getUserById(currentUser.uid);
          if (userData) {
            console.log("user already added")
            setUser({...currentUser, ...userData})
          }
          else {
            const newUserData = await saveUserData(currentUser)
            console.log("user added:", newUserData)
            setUser({...currentUser, ...newUserData})
          }
        } else {
          // If email domain is not allowed, sign the user out
          await signOut(auth);
          alert("Only Northwestern emails are allowed.");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false); // Authentication state has been determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
