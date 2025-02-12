import { useState } from "react";
import "../App.css";
import Map from "../components/Map";
import ItemPanel from "../components/ItemPanel";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navigation from "../components/Navigation";
import { useAuth } from "../services/auth";
import { useMediaQuery } from "@mui/material";

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

const Home = (isLoaded) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [query, setQuery] = useState("");
  const [bounds, setBounds] = useState(null);
  const [isFavoritePage, setIsFavoritePage] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const user = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeMarkerOnMap, setActiveMarkerOnMap] = useState(null);
  const handleActiveMarkerOnMap = (marker) => {
    setActiveMarkerOnMap(marker);
  };
  return (
    <div>
      <div>
        <Navigation
          mapBounds={bounds}
          setMapBounds={setBounds}
          visibleItems={visibleItems}
          setVisibleItems={setVisibleItems}
          setIsFavoritePage={setIsFavoritePage}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      {isMobile && (
        <div className="m-3">
          <Map
            visibleItems={visibleItems}
            setVisibleItems={setVisibleItems}
            mapBounds={bounds}
            setMapBounds={setBounds}
            priceRange={priceRange}
            query={query}
            category={category}
            dateRange={dateRange}
            isLoaded={isLoaded}
            activeMarkerOnMap={activeMarkerOnMap}
            setActiveMarkerOnMap={setActiveMarkerOnMap}
          />
        </div>
      )}
      {!isMobile && (
        <Grid container spacing={0}>
          <Grid item xs={7.3}>
              <Map
                visibleItems={visibleItems}
                setVisibleItems={setVisibleItems}
                mapBounds={bounds}
                setMapBounds={setBounds}
                priceRange={priceRange}
                query={query}
                category={category}
                dateRange={dateRange}
                isLoaded={isLoaded}
                activeMarkerOnMap={activeMarkerOnMap}
                setActiveMarkerOnMap={setActiveMarkerOnMap}
              />
          </Grid>
          <Grid item xs={4.7}>
              <ItemPanel
                items={visibleItems}
                category={category}
                onMarkerClick={handleActiveMarkerOnMap}
              />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;
