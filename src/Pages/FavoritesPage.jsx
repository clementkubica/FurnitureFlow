import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/auth";
import Navigation from "../components/Navigation";
import FavoritesPanel from "../components/FavoritesPanel";

async function fetchFavorites(user_id) {
  try {
    const res = await axios.post(
      "https://getuserfavorites-jbhycjd2za-uc.a.run.app",
      {
        user_id: user_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export default function FavoritesPage({ userId }) {
  const [favorites, setFavorites] = useState([]);
  const user = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.error("User ID not found");
        return;
      }
      const items = await fetchFavorites(user.uid);
      if (items) {
        setFavorites(items);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <Navigation showSearchBar={false} />
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <FavoritesPanel items={favorites} />
      )}
    </div>
  );
}
