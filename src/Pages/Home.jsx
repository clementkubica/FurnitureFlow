import { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import Map from "../components/Map";
import MediaCard from "../components/MediaCard";
import ItemPanel from "../components/ItemPanel";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navigation from "../components/Navigation";
import Favorites from "../components/Favorites";
import { useAuth } from "../services/auth";

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

const Home = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [query, setQuery] = useState("");
  const [bounds, setBounds] = useState(null);
  const [isFavoritePage, setIsFavoritePage] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const user = useAuth();

  return (
    <>
      <div>
        <Navigation
          mapBounds={bounds}
          setMapBounds={setBounds}
          visibleItems={visibleItems}
          setVisibleItems={setVisibleItems}
          setIsFavoritePage={setIsFavoritePage}
          query={query}
          setQuery={setQuery}
          // priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={7.3}>
          <Item>
            <Map
              visibleItems={visibleItems}
              setVisibleItems={setVisibleItems}
              mapBounds={bounds}
              setMapBounds={setBounds}
              priceRange={priceRange}
              query={query}
            />
          </Item>
        </Grid>
        <Grid item xs={4.7}>
          <Item>
            <ItemPanel items={visibleItems} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
