import React, { useEffect, useState } from "react";
import InboxItem from "./InboxItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

function InboxItemList({ setSelectedConversation }) {
  const [inboxItems, setInboxItems] = useState([]);

  const fetchInboxItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "inbox_items"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setInboxItems(items);
    } catch (error) {
      console.error("Error fetching inbox items:", error);
    }
  };

  useEffect(() => {
    fetchInboxItems();
  }, []);

  return (
    <div className="p-4 max-h-full overflow-y-auto">
      {inboxItems.length > 0 ? (
        inboxItems.map((item) => (
          <InboxItem
            key={item.id}
            imageUrl={"https://firebasestorage.googleapis.com/v0/b/furniture-flow.firebasestorage.app/o/user1%2Fbrown-couch-1%2Fbrown%20couch.jpeg?alt=media&token=cc094a01-6762-4602-826d-7f2c477c20cd"}
            receiverName={item.users && item.users[0] ? item.users[0] : "Unknown"}
            itemName={`Item ${item.item_id || "N/A"}`}
            timestamp={new Date(item.timestamp).toLocaleString()}
            preview={item.preview || "No preview available"}
            onClick={() => setSelectedConversation(item)}
          />
        ))
      ) : (
        <p className="text-gray-500">No conversations available</p>
      )}
    </div>
  );
}

export default InboxItemList;

