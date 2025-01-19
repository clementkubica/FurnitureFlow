import { useState, useEffect } from "react";
import "../App.css";
import Map from "./Map";
import ItemPanel from "./ItemPanel";
import Navigation from "./Navigation";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../services/auth"; // Auth Context

export default function HomePage() {
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
}
