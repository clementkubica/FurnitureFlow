import React from "react";
import "./App.css";
import LoadingScreen from "./components/Loading";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import { AuthProvider, useAuth } from "./services/auth";
import Login from "./components/Login";
import Inbox from "./Pages/Inbox";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home"; 
import FavoritesPage from "./Pages/FavoritesPage";
import Post from "./Pages/Post";

const GOOGLE_MAPS_API_KEY = "AIzaSyDXujfrQ-cDYi1EbQpayGEYRit-fB0KMcE";
const GOOGLE_MAPS_LIBRARIES = ["places", "geometry"];

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (location.pathname == "/inbox" && authLoading) {
    return <LoadingScreen text={"Loading Messages..."}/>;
  }

  else if (location.pathname == "/favorites" && authLoading) {
    return <LoadingScreen text={"Loading your Favorites..."}/>;
  }

  else if (authLoading) {
    return <LoadingScreen text={"Loading..."}/>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen text={"Loading..."}/>;
  }

  return !user ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home isLoaded={isLoaded} />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <PrivateRoute>
                <Inbox />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute>
                <Post isLoaded={isLoaded} /> 
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
