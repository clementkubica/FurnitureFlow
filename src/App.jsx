import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";

const App = () => {
  return (
    <>
      {/* Full-width SearchBar */}
      <div>
        <SearchBar />
      </div>
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
