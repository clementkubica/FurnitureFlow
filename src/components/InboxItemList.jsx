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
            receiverUid={item.users[0]}
            itemId={item.item_id}
            timestamp={new Date(item.timestamp).toLocaleString()}
            preview={item.preview || "No preview available"}
            onClick={() => {
              console.log("Selected Conversation:", item);
              setSelectedConversation(item)}}
          />
        ))
      ) : (
        <p className="text-gray-500">No conversations available</p>
      )}
    </div>
  );
}

export default InboxItemList;

