import React, { useEffect, useState } from "react";
import axios from "axios";

function InboxItem({
  receiverUid,
  itemId,
  timestamp,
  preview,
  onClick,
  isSelected,
}) {
  const [userDetails, setUserDetails] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const fetchInboxItemDetails = async () => {
    try {
      const itemReq = axios.post(
        "https://fetchitembyid-jbhycjd2za-uc.a.run.app",
        { item_id: itemId },
        { headers: { "Content-Type": "application/json" } }
      );

      const userReq = axios.post(
        "https://fetchuserbyid-jbhycjd2za-uc.a.run.app",
        { user_id: receiverUid },
        { headers: { "Content-Type": "application/json" } }
      );

      const [itemRes, userRes] = await Promise.all([itemReq, userReq]);

      if (itemRes.status === 200) {
        const itemData = itemRes.data;
        setItemDetails({
          item: itemData.item[0],
          imageUrl: itemData.itemImages[0]?.url || "",
        });
      }

      if (userRes.status === 200) {
        setUserDetails(userRes.data.user);
      }
    } catch (error) {
      console.error("Error fetching inbox item details:", error);
    }
  };

  useEffect(() => {
    fetchInboxItemDetails();
  }, []);

  if (itemDetails && userDetails) {
    return (
      <div
        className={`flex gap-4 items-center px-4 py-3 shadow-sm cursor-pointer 
        ${
          isSelected
            ? "bg-purple-300"
            : "hover:bg-purple-200"
        }`}
        onClick={onClick}
      >
        {/* Image */}
        <img
          className="h-16 w-16 object-contain"
          src={itemDetails.imageUrl}
          alt="Item"
        />

        {/* Text Content */}
        <div className="flex flex-col">
          {/* Receiver Name */}
          <p className="font-bold text-lg">{userDetails.username}</p>

          {/* Item Name */}
          <p className="text-sm">
            <strong>Item:</strong> {itemDetails.item.name}
          </p>

          {/* Timestamp */}
          <p className="text-xs font-semibold text-gray-600">{timestamp}</p>

          {/* Preview */}
          <p className="text-sm text-gray-500 mt-2">{preview}</p>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="flex gap-4 items-center px-4 py-3 shadow-sm animate-pulse">
      <div className="h-16 w-16 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default InboxItem;
