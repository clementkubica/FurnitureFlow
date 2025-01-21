import React, { useState } from "react";
import InboxItem from "./InboxItem";
import { useAuth } from "../services/auth";

function InboxItemList({ setSelectedConversation, selectedConversation, inboxItems }) {
  const { user } = useAuth()

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
    setSelectedConversation(item);
  };

  function getReceiverUid(users) {
    if (users[0] === user.uid) {
      return users[1]
    }
    else {
      return users[0]
    }
  }
  
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
            receiverUid={getReceiverUid(item.users)}
            itemId={item.item_id}
            timestamp={item.timestamp ? formatTimestamp(item.timestamp) : ""}
            preview={item.preview || "No preview available"}
            isSelected={selectedConversation && selectedConversation.id === item.id}
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

