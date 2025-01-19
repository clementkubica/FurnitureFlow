import React from "react";
import ItemPanel from "./ItemPanel";
import MediaCard from "./MediaCard";
import axios from "axios";

async function fetchFavorites (bounds, user_id) {
  const minLat = bounds.south;
  const maxLat = bounds.north;
  const minLon = bounds.west;
  const maxLon = bounds.east;

  try {
    const res = await axios.post(
      "https://fetchitems-jbhycjd2za-uc.a.run.app",
      {
        minLat: minLat,
        maxLat: maxLat,
        minLon: minLon,
        maxLon: maxLon,
        user_id: user_id
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export default function Favorites({mapBounds, setMapBounds, visibleItems, setVisibleItems}) {
  const [userId, setUserId] = React.useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!userId) {
  //       console.error("User ID not found");
  //       return;
  //     }
  //     const items = await fetchFavorites(mapBounds, userId);
  //     if (items) {
  //       setVisibleItems(items);
  //     }
  //   };

  //   fetchData();
  // }, [mapBounds, userId, setVisibleItems]);
  
  return (
    <div>
    <h1>Favorites</h1>
    {visibleItems.length === 0 ? (
      <p>No favorites found.</p>
    ) : (
      visibleItems.map((item) => (
        <MediaCard
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
      ))
    )}
  </div>
  );
}