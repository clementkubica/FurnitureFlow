import React from "react";
import MediaCard from "./MediaCard";
import { useNavigate } from "react-router";
function ItemPanel({ items = [], cardsPerRowParameter = 0 }) {
  // Default to an empty array
  const cardsPerRow = 2;
  console.log((1 / cardsPerRow) * 100);

  const navigate = useNavigate();
  const handleNav = (path) => {
    navigate(path);
  };

  const rows = [];
  for (let i = 0; i < items.length; i += cardsPerRow) {
    rows.push(items.slice(i, i + cardsPerRow));
  }

  return (
    <div className="bg-white overflow-x-auto overflow-y-auto max-h-[90vh]">
      <div className="flex flex-col gap-4 p-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {row.map((item, itemIndex) => (
              <MediaCard
                key={itemIndex} // Add a key for each MediaCard
                item={item}
                size={
                  cardsPerRowParameter !== 0
                    ? (1 / cardsPerRowParameter) * 100
                    : (1 / cardsPerRow) * 100
                }
                className="flex-1"
              />
            ))}
            {/* Fill empty space if row has fewer cards */}
            {row.length < cardsPerRow &&
              Array(cardsPerRow - row.length)
                .fill(null)
                .map((_, emptyIndex) => (
                  <div
                    key={`empty-${rowIndex}-${emptyIndex}`}
                    className="flex-1"
                  />
                ))}
          </div>
        ))}
        {rows.length === 0 && ( // Handle empty rows
          <div className="flex items-center justify-center h-full">
            <h1 className="text-black text-4xl font-bold text-center">
              NO LISTINGS IN THIS AREA
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemPanel;
