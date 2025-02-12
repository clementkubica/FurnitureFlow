import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FaBell, FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MailIcon from "@mui/icons-material/Mail";
import { useMediaQuery } from "@mui/material";

function Navigation({
  mapBounds,
  setMapBounds,
  visibleItems,
  setVisibleItems,
  setIsFavoritePage,
  showSearchBar = true,
  showFavorite = true,
  query,
  setQuery,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  dateRange,
  setDateRange,
}) {
  const [isFavorite, setIsFavorited] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
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

  const handleAddListing = () => {
    navigate("/post");
  };

  const handleResetFilters = () => {
    setQuery("");
    setCategory("");
    setPriceRange([0, 2000]);
    setDateRange([null, null]);
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
              className="h-12 min-w-[160px]"
            />
          </div>
        </a>
        {/* Search Bar Center and Dropdowns*/}

        {showSearchBar && (
          <div className="flex-1 flex items-center justify-center space-x-4">
            <div className="flex-1 mr-2">
              <SearchBar
                mapBounds={mapBounds}
                setMapBounds={setMapBounds}
                visibleItems={visibleItems}
                setVisibleItems={setVisibleItems}
                query={query}
                setQuery={setQuery}
              />
            </div>
            {!isMobile && (
              <div className="mr-4">
                {/* Dropdowns Buttons */}
                <div className="flex md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div className="mx-2 mr-[-30px]">
                    <FormControl
                      variant="outlined"
                      size="small"
                      className="w-40"
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 30,
                          minHeight: 30,
                        },

                        "& .MuiInputLabel-root": {
                          top: "-4px",
                          left: "-2px",
                          fontSize: "0.9rem",
                        },
                      }}
                    >
                      <InputLabel
                        id="category-label"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Categories"
                        sx={{ fontSize: "0.875rem" }}
                        className=" min-w-[115px] max-w-[115px]"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        <MenuItem value="Couch">Couch</MenuItem>
                        <MenuItem value="Dresser">Dresser</MenuItem>
                        <MenuItem value="Table">Table</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/* Price Slider */}
                  <div className="min-w-[90px] max-w-[90px] md:w-40 mx-3">
                    <div className="text-center">
                      <label className="block text-[0.75rem] font-medium text-gray-700">
                        Prices
                      </label>
                      <label className="block text-[0.75rem] font-medium text-gray-700">
                        (${priceRange[0]} - ${priceRange[1]})
                      </label>
                    </div>
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
                  <div className="ml-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <DatePicker
                          label="Start"
                          value={dateRange[0]}
                          onChange={handleStartDateChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              variant="outlined"
                              sx={{
                                fontSize: 10,
                              }}
                            />
                          )}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: 30,
                              minHeight: 30,
                            },
                            "& .MuiInputLabel-root": {
                              top: "-12px",
                              left: "0px",
                            },
                          }}
                        />
                        <Box sx={{ mx: 1 }}> to </Box>
                        <div className="mr-3">
                          <DatePicker
                            label="End"
                            value={dateRange[1]}
                            onChange={handleEndDateChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                variant="outlined"
                                sx={{
                                  width: 120, // Keep consistent width
                                }}
                              />
                            )}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: 30,
                                minHeight: 30,
                              },
                              "& .MuiInputLabel-root": {
                                top: "-12px",
                                left: "0px",
                              },
                            }}
                          />
                        </div>
                      </Box>
                    </LocalizationProvider>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleResetFilters}
                      sx={{
                        textTransform: "none",
                        height: "30px",
                        marginRight: "16px",
                        marginLeft: "-18px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Button
            className="!bg-purple-400 !text-white hover:!bg-purple-500"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddListing}
            size="small"
          >
            post
          </Button>
          <a href="/inbox">
            <MailIcon
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
        </div>
      </div>
      {showSearchBar && isMobile && (
        <>
          <div className="mr-4 ml-2">
            {/* Dropdowns Buttons */}
            <div className="flex md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="mx-2 mr-[-30px]">
                <FormControl
                  variant="outlined"
                  size="small"
                  className="w-40"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 30,
                      minHeight: 30,
                    },

                    "& .MuiInputLabel-root": {
                      top: "-4px",
                      left: "-2px",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  <InputLabel id="category-label" sx={{ fontSize: "0.875rem" }}>
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    label="Categories"
                    sx={{ fontSize: "0.875rem" }}
                    className=" min-w-[115px] max-w-[115px]"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem value="Couch">Couch</MenuItem>
                    <MenuItem value="Dresser">Dresser</MenuItem>
                    <MenuItem value="Table">Table</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Price Slider */}
              <div className="min-w-[90px] max-w-[90px] md:w-40 mx-3">
                <div className="text-center">
                  <label className="block text-[0.75rem] font-medium text-gray-700">
                    Prices
                  </label>
                  <label className="block text-[0.75rem] font-medium text-gray-700">
                    (${priceRange[0]} - ${priceRange[1]})
                  </label>
                </div>
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
              <div className="ml-2">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DatePicker
                      label="Start"
                      value={dateRange[0]}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          sx={{
                            width: 120, // Smaller width
                            height: 30, // Reduce height
                          }}
                        />
                      )}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 30,
                          minHeight: 30,
                        },
                        "& .MuiInputLabel-root": {
                          top: "-12px",
                          left: "0px",
                        },
                      }}
                    />
                    <Box sx={{ mx: 1 }}> to </Box>
                    <DatePicker
                      label="End"
                      value={dateRange[1]}
                      onChange={handleEndDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          sx={{
                            width: 120, // Keep consistent width
                          }}
                        />
                      )}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 30,
                          minHeight: 30,
                        },
                        "& .MuiInputLabel-root": {
                          top: "-12px",
                          left: "0px",
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
