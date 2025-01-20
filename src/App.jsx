import React from "react";
import "./App.css";
// import Map from "./components/Map";
// import ItemPanel from "./components/ItemPanel";
// import Navigation from "./components/Navigation";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./services/auth"; // Auth Context

const PrivateRoute = ({ children }) => {
  const { user, authLoading} = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;

};

const PublicRoute = ({ children }) => {
  const {user, authLoading} = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return !user ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
  <AuthProvider>
  <Router>
    <Routes>
      <Route
      path="/login"
      element={<PublicRoute><Login /></PublicRoute>}
    />
    <Route
      path="/"
      element={<PrivateRoute><HomePage/></PrivateRoute>}
    />
    </Routes>
  </Router>
  </AuthProvider>
  );
};

export default App;
