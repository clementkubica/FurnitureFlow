import React, { useEffect, useState } from "react";
import InboxItem from "./InboxItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

function InboxItemList({ setSelectedConversation }) {
  const [inboxItems, setInboxItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchInboxItems = async () => {
    try {
      // right now we're fetching all of the inbox_items from the collection
      // soon, we need to change it so that we're fetching all of the inbox_items where the current user's id is in the users array
      const querySnapshot = await getDocs(collection(db, "inbox_items"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log(typeof(items[0].timestamp))
      console.log(items[0].timestamp)
      setInboxItems(items);
    } catch (error) {
      console.error("Error fetching inbox items:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const epochTime = timestamp.seconds; // Example Epoch time in seconds

    // Create a Date object using the Epoch time (in milliseconds)
    const date = new Date(epochTime * 1000); 

    // Format the date object into a readable string
    const formattedDate = date.toLocaleDateString(); // "03/10/2023"
    const formattedTime = date.toLocaleTimeString(); // "12:00:00 AM" 

    return formattedTime + ", " + formattedDate
  }

  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
    setSelectedConversation(item);
  };

  useEffect(() => {
    fetchInboxItems();
  }, []);

  return (
    <div
      className="p-4 overflow-y-auto border-r bg-white"
      style={{
        maxHeight: "100vh",
        height: "100%",
      }}
    >
      {inboxItems.length > 0 ? (
        inboxItems.map((item) => (
          <InboxItem
            key={item.id}
            imageUrl={
              "https://firebasestorage.googleapis.com/v0/b/furniture-flow.firebasestorage.app/o/user1%2Fbrown-couch-1%2Fbrown%20couch.jpeg?alt=media&token=cc094a01-6762-4602-826d-7f2c477c20cd"
            }
            receiverName={item.users && item.users[0] ? item.users[0] : "Unknown"}
            itemName={`Item ${item.item_id || "N/A"}`}
            receiverUid={item.users[0]}
            itemId={item.item_id}
            timestamp={formatTimestamp(item.timestamp)}
            preview={item.preview || "No preview available"}
            isSelected={selectedItemId === item.id}
            onClick={() => handleItemClick(item)}
          />
        ))
      ) : (
        <p className="text-gray-500">No conversations available</p>
      )}
    </div>
  );
}

export default InboxItemList;

