import React from "react";
import MediaCard from "./MediaCard";

function ItemPanel() {
  return (
    <div className="bg-white overflow-x-auto overflow-y-auto max-h-[80vh]">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-4">
          <MediaCard
            name="Couch"
            price="10.00"
            user="dr.riesbeck"
            description="this is an amazing brown leather couch. barely used!"
            className="flex-1"
          />
          <MediaCard
            name="Plant"
            price="12.00"
            user="dr.hummel"
            description="this is a beautiful monsterra"
            className="flex-1"
          />
        </div>
        <div className="flex flex-row gap-4">
          <MediaCard
            name="Black Chair"
            price="5.00"
            user="nustudent"
            description="used chair with broken leg"
            className="flex-1"
          />
          <MediaCard
            name="Dining table"
            price="30.00"
            user="dr.riesbeck"
            description="gently used dining tables"
            className="flex-1"
          />
        </div>
        <div className="flex flex-row gap-4">
          <MediaCard
            name="Dining table"
            price="30.00"
            user="dr.riesbeck"
            description="gently used dining tables"
            className="flex-1"
          />
          <MediaCard
            name="Dining table"
            price="30.00"
            user="dr.riesbeck"
            description="gently used dining tables"
            className="flex-1"
          />
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

export default ItemPanel;
