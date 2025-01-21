import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { saveUserData } from "../services/firestore";
import { useNavigate } from "react-router-dom"; 
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../services/auth";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const {user} = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email.endsWith("@u.northwestern.edu")) {
        navigate("/"); // Navigate to the homepage
      } else {
        alert("Only Northwestern emails are allowed");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Please use your Northwestern email to sign in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Furniture Flow</h1>
        <p className="text-gray-600 mb-6">
          Log in with your Northwestern email to continue.
        </p>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full"
        >
          <GoogleIcon /> Sign in with Google
        </button>
      </div>
    </div>
  );
};


export default Login;
