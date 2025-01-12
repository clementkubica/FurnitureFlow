import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar"
import { Grid } from "@mui/material";
import Navigation from "./components/Navigation"
import Item from "./components/Item"

const App = () => {
  return (
    <>
      <div>
        <Navigation />
      </div>
      {/* <div>
        <SearchBar />
      </div> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <Map />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <ItemPanel />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
