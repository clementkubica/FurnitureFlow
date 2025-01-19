import React from "react";
import InboxItem from "./InboxItem";

function InboxItemList() {
    const inboxItems = [
        {
          conversationId: "conv_001",
          itemId: 1,
          sellerId: "user_123",
          buyerId: "user_456",
          timestamp: "2025-01-19T14:30:00Z",
          preview: "Hello, I’m interested in your item for sale.",
        },
        {
          conversationId: "conv_002",
          itemId: 2,
          sellerId: "user_789",
          buyerId: "user_123",
          timestamp: "2025-01-19T13:15:00Z",
          preview: "Can you provide more details about the product?",
        },
        {
          conversationId: "conv_003",
          itemId: 3,
          sellerId: "user_456",
          buyerId: "user_789",
          timestamp: "2025-01-18T09:45:00Z",
          preview: "The item has been shipped. Let me know if you need anything else.",
        },
      ];

    return (
      <div className="p-4 max-h-full overflow-y-auto">
          {inboxItems.map((item) => (
              <InboxItem imageUrl={"https://firebasestorage.googleapis.com/v0/b/furniture-flow.firebasestorage.app/o/user1%2Fbrown-couch-1%2Fbrown%20couch.jpeg?alt=media&token=cc094a01-6762-4602-826d-7f2c477c20cd"} receiverName={item.sellerId} itemName={item.itemId} timestamp={item.timestamp} preview={item.preview} />
          ))}
      </div>
    )
}

export default InboxItemList