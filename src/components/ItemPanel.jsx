import React from "react";
import MediaCard from "./MediaCard";

function ItemPanel({ items }) {
  const cardsPerRow = 2;

  const rows = [];
  for (let i = 0; i < items.length; i += cardsPerRow) {
    rows.push(items.slice(i, i + cardsPerRow));
  }

  return (
    <div className="bg-white overflow-x-auto overflow-y-auto max-h-[80vh]">
      <div className="flex flex-col gap-4 p-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {row.map((item, itemIndex) => (
              <MediaCard
                key={`${rowIndex}-${itemIndex}`}
                name={item.name}
                price={item.price}
                user={item.user}
                description={item.description}
                className="flex-1"
              />
            ))}
            {}
            {row.length < cardsPerRow &&
              Array(cardsPerRow - row.length)
                .fill(null)
                .map((_, emptyIndex) => (
                  <div key={`empty-${rowIndex}-${emptyIndex}`} className="flex-1" />
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemPanel;
