import React from "react";
import MediaCard from "./FavoritesCard";

function FavoritesPanel({ items = [] }) {
  const cardsPerRow = 4;

  const rows = [];
  for (let i = 0; i < items.length; i += cardsPerRow) {
    rows.push(items.slice(i, i + cardsPerRow));
  }

  return (
    <div className="bg-white overflow-y-auto max-h-[90vh]">
      <div className="flex flex-col gap-4 p-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {row.map((item, itemIndex) => (
              <MediaCard
                key={itemIndex} // Add a key for each MediaCard
                item_id={item.item_id}
                name={item.name}
                image={item.image_url}
                price={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(item.price))}
                user={item.username}
                date_posted={item.date_posted}
                description={item.description}
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
        {items.length === 0 && ( // Handle empty rows
          <div className="flex items-center justify-center h-full">
            <h1 className="text-black text-4xl font-bold text-center">
              NO FAVORITES
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPanel;
