import React, { useState} from "react";
import SearchBar from "./SearchBar";
import { FaBell, FaUser, FaHeart } from "react-icons/fa"; 
function Navigation() {
  const [isFavorite, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorite);
  }
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
      {/* Search Bar Center */}
      <div className="flex-1 mx-4">
        <SearchBar />
      </div>
      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        <FaBell className="text-black text-xl hover:text-gray-400 cursor-pointer" />
        <FaHeart
          className={`text-xl cursor-pointer ${isFavorite ? "text-red-500" : "text-black hover:text-red-500"}`}
          onClick={toggleFavorite}
          title={isFavorite ? "Unfavorite" : "Favorite"}
        />
        <FaUser className="text-black text-xl hover:text-gray-400 cursor-pointer" />
      </div>
      </div>
      {/* Drop Down Buttons Below */}
      <div className="flex space-x-4 mt-4 px-4">
        <select className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Categories</option>
          <option value="couch">Couch</option>
          <option value="dresser">Dresser</option>
        </select>
        <select className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Prices</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
        <select className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Date Needed</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
        </select>
      </div>
  </nav>
  );
}

export default Navigation;
