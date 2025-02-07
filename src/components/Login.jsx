import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { saveUserData } from "../services/firestore";
import { useNavigate } from "react-router-dom"; 
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../services/auth";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled } from '@mui/material/styles';

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
  <>
    this is a test
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
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
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
                  color: 'primary.main',
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
            Explore our cutting-edge dashboard, delivering high-quality solutions
            tailored to your needs. Elevate your experience with top-tier features
            and services.
          </Typography>
          <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
                id="email-hero"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Enter your email address"
                placeholder="Your email address"
                fullWidth
                slotProps={{
                  htmlInput: {
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: 'fit-content' }}
            >
              Start now
            </Button>
          </Stack>
          <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
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
  </>
  );
};


export default Login;
