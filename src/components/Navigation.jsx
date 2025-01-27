import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FaBell, FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function Navigation({
  mapBounds,
  setMapBounds,
  visibleItems,
  setVisibleItems,
  setIsFavoritePage,
  showSearchBar = true,
  showFavorite = true,
  priceRange,
  setPriceRange,
  dateRange,
  setDateRange,
}) {
  const [isFavorite, setIsFavorited] = useState(false);
  const [category, setCategory] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorited(!isFavorite);
    setIsFavoritePage(!isFavorite);
  };

  const handlePriceRange = (event, newValue) => {
    console.log("Price Range Changed:", newValue);
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  // Handlers for Date Pickers
  const handleStartDateChange = (newValue) => {
    setDateRange([newValue, dateRange[1]]);
    console.log("Start Date Changed:", newValue);
  };
  const handleEndDateChange = (newValue) => {
    if (dateRange[0] && newValue < dateRange[0]) {
      alert("End date cannot be before start date.");
      return;
    }
    setDateRange([dateRange[0], newValue]);
    console.log("End Date Changed:", newValue);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow w-full">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left Hand image logo */}
        <a href="/">
          <div className="flex-shrink-0">
            <img
              src="/images/logo_with_name.PNG"
              alt="App Logo with Title"
              className="h-12"
            />
          </div>
        </a>
        {/* Search Bar Center and Dropdowns*/}
        {showSearchBar && (
          <div className="flex-1 flex items-center justify-center space-x-4 mx-4">
            <div className="flex-1 mx-4">
              <SearchBar
                mapBounds={mapBounds}
                setMapBounds={setMapBounds}
                visibleItems={visibleItems}
                setVisibleItems={setVisibleItems}
              />
            </div>
            {/* Dropdowns Buttons */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <FormControl variant="outlined" size="small" className="w-40">
                <InputLabel id="category-label" sx={{ fontSize: "0.875rem" }}>
                  Categories
                </InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Categories"
                  sx={{ fontSize: "0.875rem" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="couch">Couch</MenuItem>
                  <MenuItem value="dresser">Dresser</MenuItem>
                </Select>
              </FormControl>
              {/* Price Slider */}
              <div className="w-36 md:w-40">
                <label className="block text-[0.75rem] font-medium text-gray-700 mb-1">
                  Prices (${priceRange[0]} - ${priceRange[1]})
                </label>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  step={10}
                  aria-labelledby="price-slider"
                />
              </div>
              {/* Date Pickers */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DatePicker
                    label="Start Date"
                    value={dateRange[0]}
                    onChange={handleStartDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        sx={{ width: 150, fontSize: "0.875rem" }}
                      />
                    )}
                  />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <DatePicker
                    label="End Date"
                    value={dateRange[1]}
                    onChange={handleEndDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        sx={{ width: 150, fontSize: "0.875rem" }}
                      />
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <a href="/inbox">
            <FaBell
              className="text-black text-xl hover:text-yellow-400 cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            />
          </a>
          {showFavorite && (
            <a href="/favorites">
              <FaHeart
                className={`text-xl cursor-pointer ${
                  isFavorite ? "text-red-500" : "text-black hover:text-red-500"
                }`}
                onClick={() => {
                  toggleFavorite();
                }}
                title={isFavorite ? "Unfavorite" : "Favorite"}
                aria-label={isFavorite ? "Unfavorite" : "Favorite"}
                tabIndex="0"
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    toggleFavorite();
                    setIsFavoritePage(true);
                  }
                }}
              />
            </a>
          )}
          <FaUser
            className="text-black text-xl hover:text-gray-400 cursor-pointer"
            aria-label="User Profile"
            title="User Profile"
            onClick={handleProfile}
          />
          {/* Logout Button */}
          {/* {user && (
            <button
              onClick={handleLogout}
              className="flex items-cetner text-black hover:text-red-500 cursor-pointer"
              aria-label="Logout"
              title="Logout"
            >
              <FaSignOutAlt className="text-[25px] mr-1 ml-0" />
              <h5 className="mt-[-2px] text-[20px]">log out</h5>
            </button>
          )} */}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
