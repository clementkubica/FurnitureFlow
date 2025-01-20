import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { getUserData } from "./firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await getUserData(currentUser.uid); // Fetch user data from Firestore
        setUser({ ...currentUser, ...userData });
      } else {
        setUser(null);
      }
      setAuthLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  return (<AuthContext.Provider value={{user, authLoading}}>{children}</AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
