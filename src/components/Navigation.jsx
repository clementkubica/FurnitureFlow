import React from "react";
import SearchBar from "./SearchBar";
import { FaBell, FaUser } from "react-icons/fa"; 
function Navigation() {
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 py-4">
        {/* Left Hand image logo */}
        <div className="flex items-center">
        <img
          src="/images/logo_with_name.PNG"
          alt="App Logo with Title"
          className="h-12 mr-4"
        />
        {/* Search Bar Center */}
        <div className="flex-grow">
          <SearchBar />
        </div>
        {/* Right Icons */}
        <div className="flex items-center space-x-6 ml-4">
          <FaBell className="text-black text-xl hover: text-gray-400 cursor-pointer" />
          <FaUser className="text-black text-xl hover: text-gray-400 cursor-pointer" />
        </div>
        </div>
        {/* Drop Down Buttons Below */}
        <div className="flex space x-4 mt-4">
          <select className="border border-gray-300 rounded px-4 py-2">
            <option value="">Categories</option>
            <option value="couch">Couch</option>
            <option value="dresser">Dresser</option>
          </select>
          <select className="border border-gray-300 rounded px-4 py-2">
            <option value="">Prices</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
          <select className="border border-gray-300 rounded px-4 py-2">
            <option value="">Date Needed</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
      </div>
    </div>
  </nav>
  );
}

export default Navigation;
