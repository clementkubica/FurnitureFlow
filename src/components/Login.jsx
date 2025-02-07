import React, {useState} from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom"; 
import GoogleIcon from "@mui/icons-material/Google";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email.endsWith("@u.northwestern.edu")) {
        navigate("/");
      } else {
        alert("Only Northwestern emails are allowed");
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Please use your Northwestern email to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated Gradient Background */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          background: "linear-gradient(270deg, #ff7e5f, #feb47b, #86a8e7, #91eae4)",
          backgroundSize: "800% 800%",
          animation: "gradientAnimation 15s ease infinite",
        }}
      >
        <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 5, borderRadius: 2 }}>
          {/* Logo at the top of the card */}
          <CardMedia
            component="img"
            image="/images/logo_with_name.PNG" 
            alt="Furniture Flow Logo"
            sx={{ height: 140, objectFit: "contain", p: 2 }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Furniture Flow
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Log in with your Northwestern email to continue.
            </Typography>
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                width: "100%",
              }}
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Loading Dialog */}
      <Dialog
        open={loading}
        PaperProps={{ style: { padding: "20px", textAlign: "center" } }}
        aria-labelledby="loading-dialog-title"
      >
        <DialogTitle id="loading-dialog-title">Signing In</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress />
            <Typography variant="body1">Please wait while we log you in...</Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* CSS for Animated Background */}
      <style jsx="true">{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Login;