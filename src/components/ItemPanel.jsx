import React, { useState } from "react";
import MediaCard from "./MediaCard";

function ItemPanel() {
  return (
    <div className="bg-blue-200">
      <div>
        <MediaCard
          name="Brown Leather Couch"
          price="10.00"
          user="dr.riesbeck"
          description="this is an amazing brown leather couch. barely used!"
        />
        <MediaCard
          name="Plant"
          price="12.00"
          user="dr.hummel"
          description="this is a beautiful monsterra"
        />
        <MediaCard
          name="Black Chair"
          price="5.00"
          user="nustudent"
          description="used chair with broken leg"
        />
      </div>
    </div>
  );
}

export default ItemPanel;
