import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import ItemPanel from "./components/ItemPanel";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./services/auth"; // Auth Context

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
