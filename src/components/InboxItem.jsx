import { useEffect, useState } from "react";
import axios from "axios";

function InboxItem({ receiverUid, itemId, timestamp, preview, onClick}) {

    const [userDetails, setUserDetails] = useState(null)
    const [itemDetails, setItemDetails] = useState(null)

    const fetchInboxItemDetails = async () => {
      const itemReq = await axios.post(
        "https://fetchitembyid-jbhycjd2za-uc.a.run.app",
        {
          item_id: itemId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const userReq = axios.post(
        "https://fetchuserbyid-jbhycjd2za-uc.a.run.app",
        {
          user_id: receiverUid
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const res = await Promise.all([itemReq, userReq])
      const itemRes = res[0]
      const userRes = res[1].data
      
      setUserDetails(userRes.user)

      if (itemRes.status == 200) {
        const itemData = itemRes.data
        setItemDetails({
          item: itemData.item[0],
          imageUrl: itemData.itemImages[0].url
        })
      }
    }

    useEffect(() => {
      fetchInboxItemDetails()
    }, [])

    if (itemDetails && userDetails) {

    return (
        <div
          className="flex gap-4 items-center px-4 py-3 shadow-sm cursor-pointer hover:bg-gray-100"
          onClick={onClick}
        >
          {/* Image */}
          <img
            className="h-16 w-16 object-contain"
            src={itemDetails.imageUrl}
            alt={"item image"}
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

    return (
      <>
      </>
    )
}

export default InboxItem;