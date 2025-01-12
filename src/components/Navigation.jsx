import React from "react";
import SearchBar from "./SearchBar";

function Navigation() {
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a
          className="text-black text-lg hover:text-gray-300"
          href="https://google.com"
        >
          Home
        </a>
        <a
          className="text-black text-lg hover:text-gray-300"
          href="https://google.com"
        >
          Messages
        </a>
        <SearchBar />
        <a
          className="text-black text-lg hover:text-gray-300"
          href="https://google.com"
        >
          Settings
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
