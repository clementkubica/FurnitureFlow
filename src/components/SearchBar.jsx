import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

async function fetchItems(bounds, query) {
  const minLat = bounds.south;
  const maxLat = bounds.north;
  const minLon = bounds.west;
  const maxLon = bounds.east;

  try {
    const res = await axios.post(
      "https://fetchitems-jbhycjd2za-uc.a.run.app",
      {
        minLat: minLat,
        maxLat: maxLat,
        minLon: minLon,
        maxLon: maxLon,
        query: query,
        minPrice: 0,
        maxPrice: 200,
        query: query,
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

export default function SearchBar({
  mapBounds,
  setVisibleItems,
  query,
  setQuery,
}) {
  const handleSearch = async (e) => {
    e.preventDefault();
    const items = await fetchItems(mapBounds, query);
    if (items) {
      setVisibleItems(items);
      setVisibleItems(items);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={query}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Search>
    </form>
  );
}
