import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import ItemPanel from "./components/ItemPanel";
import Navigation from "./components/Navigation";
import Login from "./components/Login";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./services/auth"; // Auth Context

const HomePage = () => {
  const user = useAuth();
  const [visibleItems, setVisibleItems] = useState([]); // State for items
  const [mapBounds, setMapBounds] = useState(null); // State for map bounds

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navigation 
        mapBounds={mapBounds} 
        setMapBounds={setMapBounds} 
        visibleItems={visibleItems} 
        setVisibleItems={setVisibleItems} 
      />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <Map 
            visibleItems={visibleItems} 
            setVisibleItems={setVisibleItems} 
            mapBounds={mapBounds} 
            setMapBounds={setMapBounds} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <ItemPanel items={visibleItems} />
        </div>
      </div>
    </div>
  );
};

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