import React from "react";
import MediaCard from "./MediaCard";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mui/material";
function ItemPanel({ items = [], category, onMarkerClick }) {
  // Default to an empty array
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cardsPerRow = isMobile ? 1 : 2;
  const navigate = useNavigate();
  const handleNav = (path) => {
    navigate(path);
  };

  const rows = [];
  for (let i = 0; i < items.length; i += cardsPerRow) {
    rows.push(items.slice(i, i + cardsPerRow));
  }

  return (
    <div className="overflow-x-auto overflow-y-auto p-4 max-h-[90vh]">
      <div
        className={`flex flex-col gap-4 ${isMobile ? "mr-[-15px]" : "pr-4"}`}
      >
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {row.map((item, itemIndex) => (
              <MediaCard
                key={itemIndex} // Add a key for each MediaCard
                item={item}
                size={isMobile ? 100 : (1 / cardsPerRow) * 100}
                className="flex-1"
                onMarkerClick={onMarkerClick}
              />
            ))}
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
        {rows.length === 0 && (
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
