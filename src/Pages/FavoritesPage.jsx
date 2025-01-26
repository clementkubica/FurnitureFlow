import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/auth";
import Navigation from "../components/Navigation";
import FavoritesPanel from "../components/FavoritesPanel";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.error("User ID not found");
        setLoading(false);
        return;
      }
      const items = await fetchFavorites(user.user.uid);
      if (items) {
        setFavorites(items);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div>
        <Navigation showSearchBar={false} />
        <h1 style={{ textAlign: "center", marginTop: "15px", fontSize: "2.2rem", fontWeight: "bold" }}>Favorites</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress style={{ color: "#6c63ff" }} size={60} />
          <p style={{ marginTop: "20px", fontSize: "1.5rem", color: "grey" }}>
            Loading your favorites...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation showSearchBar={false} />
      <h1 style={{ textAlign: "center", marginTop: "15px", fontSize: "2.2rem", fontWeight: "bold" }}>Favorites</h1>
      {favorites.length === 0 ? (
        <p
        style={{ textAlign: "center", fontSize: "3rem", marginTop: "20px", color: "grey", fontStyle: "italic"}}
      >
        No favorites found. Start adding items to your favorites!
      </p>
      ) : (
        <Grid item xs={4.7}>
          <Item>
          <FavoritesPanel items={favorites} />
          </Item>
        </Grid>
      )}
    </div>
  );
}
