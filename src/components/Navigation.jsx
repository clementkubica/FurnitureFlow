import React, { useState} from "react";
import SearchBar from "./SearchBar";
import { FaBell, FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa"; 
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {auth} from "../firebase/FirebaseConfig";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/auth";

function Navigation({ mapBounds, setMapBounds, visibleItems, setVisibleItems }) {
  const [isFavorite, setIsFavorited] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");

  const {user} = useAuth();
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorited(!isFavorite);
  }

  const handlePriceRange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleDateNeeded = (event) => {
    setDateNeeded(event.target.value);
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
        <div className="flex-shrink-0">
        <img
          src="/images/logo_with_name.PNG"
          alt="App Logo with Title"
          className="h-12"
        />
      </div>
      {/* Search Bar Center and Dropdowns*/}
      <div className="flex-1 flex items-center justify-center space-x-4 mx-4">
        <div className="flex-1 mx-4">
          <SearchBar mapBounds={mapBounds} setMapBounds={setMapBounds } visibleItems={visibleItems} setVisibleItems={setVisibleItems}/>
        </div>
      {/* Dropdowns Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <FormControl variant="outlined" size="small" className="w-40">
          <InputLabel id="category-label" sx={{ fontSize: '0.875rem' }}>Categories</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            label="Categories"
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
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
        {/* Date Needed By */}
        <FormControl variant="outlined" size="small" className="w-40">
          <InputLabel id="date-needed-label" sx={{ fontSize: '0.875rem' }}>Date Needed</InputLabel>
          <Select 
            labelId="date-needed-label"
            id="date-needed-select"
            value={dateNeeded}
            onChange={handleDateNeeded}
            label="Date Needed"
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="this-week">This Week</MenuItem>
            <MenuItem value="this-month">This Month</MenuItem>
            <MenuItem value="this-quarter">This Quarter</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center space-x-4">
        <FaBell 
          className="text-black text-xl hover:text-yellow-400 cursor-pointer"
          aria-label="Notifications"
          title="Notifications" 
          />
        <FaHeart
          className={`text-xl cursor-pointer ${isFavorite ? "text-red-500" : "text-black hover:text-red-500"}`}
          onClick={toggleFavorite}
          title={isFavorite ? "Unfavorite" : "Favorite"}
          aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          tabIndex="0"
          onKeyPress={(e) => {
            if (e.key == "Enter") toggleFavorite();
          }}
        />
        <FaUser 
          className="text-black text-xl hover:text-gray-400 cursor-pointer"
          aria-label="User Profile"
          title="User Profile" 
          />
        {/* Logout Button */}
        { user && (
          <button
          onClick={handleLogout}
          className="flex items-cetner text-black hover:text-red-500 cursor-pointer"
          aria-label="Logout"
          title="Logout"
          >
            <FaSignOutAlt className="text-xl mr-1"/>
            Logout
          </button>
        )}
        </div>
      </div>
  </nav>
  );
}

export default Navigation;
