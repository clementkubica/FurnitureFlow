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
  const [bounds, setBounds] = useState(null);
  const [isFavoritePage, setIsFavoritePage] = useState(false);
  const [userId, setUserId] = React.useState("");

  return (
    <>
      <div>
        <Navigation
          mapBounds={bounds}
          setMapBounds={setBounds}
          visibleItems={visibleItems}
          setVisibleItems={setVisibleItems}
          setIsFavoritePage={setIsFavoritePage}
        />
      </div>
      {/* <div>
        <SearchBar />
      </div> */}
      <Grid container spacing={2}>
        <Grid item xs={7.3}>
          <Item>
            <Map
              visibleItems={visibleItems}
              setVisibleItems={setVisibleItems}
              mapBounds={bounds}
              setMapBounds={setBounds}
            />
          </Item>
        </Grid>
        {isFavoritePage ? (
          <Grid item xs={4.7}>
            <Item>
              <Favorites userId={1} />
            </Item>
          </Grid>
        ) : (
          <Grid item xs={4.7}>
            <Item>
              <ItemPanel items={visibleItems} />
            </Item>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
