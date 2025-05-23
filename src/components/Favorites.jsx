import React from "react";
import { useState, useEffect } from "react";
import ItemPanel from "./ItemPanel";
import axios from "axios";

async function fetchFavorites(user_id) {

  try {
    const res = await axios.post(
      "https://getuserfavorites-jbhycjd2za-uc.a.run.app",
      {
        user_id: user_id
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

export default function Favorites({userId}) {
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.error("User ID not found");
        return;
      }
      const items = await fetchFavorites(userId);
      if (items) {
        setFavorites(items);
      }
    };

    fetchData();
  }, [userId]);
  
  return (
    <div>
    <h1>Favorites</h1>
    {favorites.length === 0 ? (
      <p>No favorites found.</p>
    ) : (
      <ItemPanel items={favorites}/>
    )}
  </div>
  );
}