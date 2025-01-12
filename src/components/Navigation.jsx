import React from "react";
import SearchBar from "./SearchBar";

function Navigation() {
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 py-4">
        {/* Left Hand image logo */}
        <div className="flex items-center justify-between">
        <img
          src="/images/logo_with_name.PNG"
          alt="App Logo with Title"
          className="h-12"
        />
        {/* Links to the right */}
        <div className="flex flex-grow justify-evenly ml-8">
          <a className="text-black text-lg hover:text-gray-300 font-bold"
          href="https://google.com"
        >
          Home
        </a>
        <a
          className="text-black text-lg hover:text-gray-300 font-bold"
          href="https://google.com"
        >
          Messages
        </a>
        <a
          className="text-black text-lg hover:text-gray-300 font-bold"
          href="https://google.com"
        >
          Settings
        </a>
      </div>
    </div>
    {/* Bottom Row: Search Bar */}
    <div className="mt-4">
        <SearchBar />
      </div>
    </div>
  </nav>
  );
}

export default Navigation;
