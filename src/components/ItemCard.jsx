import React, { useState } from "react";

function ItemPanel() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div
        className={`flex-grow bg-gray-100 transition-all duration-300 ${
          isOpen ? "pr-80" : ""
        }`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p>This area shrinks when the panel is open.</p>
        </div>
      </div>

      {/* Right-Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-80`}
      >
        <button
          onClick={togglePanel}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-l-md"
        >
          {isOpen ? "→" : "←"}
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Item Panel</h2>
          <p>Here's the panel content!</p>
        </div>
      </div>
    </div>
  );
}

export default ItemPanel;
