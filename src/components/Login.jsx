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


import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';

import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";


const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));




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
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-stone-100 to-purple-200">
        <div className="flex flex-col items-center justify-center">
                <div className="flex-col mb-0.0 items-center justify-center">
                    <Box
                        id="hero"
                        sx={(theme) => ({
                            width: '100%',
                            backgroundRepeat: 'no-repeat',
                            ...theme.applyStyles('dark', {}),
                        })}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                pt: { xs: 7, sm: 10 },
                                pb: { xs: 0, sm: 0 },
                            }}
                        >
                            <Stack
                                spacing={2}
                                useFlexGap
                                sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: 'center',
                                        fontSize: 'clamp(3rem, 10vw, 3.5rem)',
                                    }}
                                >
                                    Welcome&nbsp;to&nbsp;
                                    <Typography
                                        component="span"
                                        variant="h1"
                                        sx={(theme) => ({
                                            fontSize: 'inherit',
                                            fontWeight: 'bold',
                                            color: 'purple',
                                            ...theme.applyStyles('dark', {
                                                color: 'primary.light',
                                            }),
                                        })}
                                    >
                                        Furniture Flow
                                    </Typography>
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                        width: { sm: '100%', md: '80%' },
                                    }}
                                >
                                    Explore the new and fresh platform for Northwestern students to easily get furniture for the new home. Delivering a high-quality solution
                                    tailored to wildcats' needs.
                                </Typography>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={1}
                                    useFlexGap
                                    sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
                                >
                                </Stack>
                            </Stack>
                        </Container>
                    </Box>

              </div>
            {/*<div className="flex-row m-1.5 pb-5">
                    <img
                        src="/images/preview.png"
                        alt="App Logo with Title"
                        className="max-w-[600px] shadow-lg rounded-lg mb-3"
                    />
                </div>*/}
            {/*<div className="">
            <Flicking
                align="prev"
                circular={true}
                moveType="freeScroll"
                onMoveEnd={e => {
                    console.log(e);
                }}>
                <div className="panel flex-row m-1.5 pb-5">
                    <img
                        src="/images/deal-image.png"
                        alt="App Logo with Title"
                        className="max-w-[420px] shadow-lg rounded-lg mb-3"
                    />
                </div>
                <div className="panel flex-row m-1.5 pb-5">
                    <img
                        src="/images/preview.png"
                        alt="App Logo with Title"
                        className="max-w-[600px] shadow-lg rounded-lg mb-3"
                    />
                </div>
                <div className="panel flex-row m-1.5 pb-5">
                    <img
                        src="/images/like-image.png"
                        alt="App Logo with Title"
                        className="max-w-[200px] shadow-lg rounded-lg mb-3"
                    />
                </div>
            </Flicking>
            </div>*/}
            <div className="flex flex-row mr-30">
                <div className="m-1.5 pb-5">
                    <img
                        src="/images/deal-image.png"
                        alt="App Logo with Title"
                        className="max-w-[184px] shadow-lg rounded-lg mb-3"
                    />
                </div>
                <div className="m-1.5 pb-5">
                    <img
                        src="/images/preview.png"
                        alt="App Logo with Title"
                        className="max-w-[600px] shadow-lg rounded-lg mb-3"
                    />
                </div>
                <div className="m-1.5 pb-5">
                    <img
                        src="/images/like-image.png"
                        alt="App Logo with Title"
                        className="max-w-[200px] shadow-lg rounded-lg mb-3"
                    />
                </div>
            </div>
            <div className="max-w-sm w-full text-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
                    {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Furniture Flow</h1> */}
                    <p className="text-gray-600 mb-6">
                        Log in with your Northwestern email to continue.
                    </p>
                    <button
                        onClick={handleGoogleSignIn}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full"
                    >
                        <GoogleIcon /> Sign in with Google
                    </button>
                </div>
            </div>

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
        </div>
    </div>
  );
};

export default Login;