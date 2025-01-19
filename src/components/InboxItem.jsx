function InboxItem({ imageUrl, receiverName, itemName, preview, timestamp }) {

    return (
        <div
          className="flex gap-4 items-center px-4 py-3 shadow-sm cursor-pointer hover:bg-gray-100"
        >
          {/* Image */}
          <img
            className="h-16"
            src={imageUrl}
            alt={receiverName}
          />
    
          {/* Text Content */}
          <div className="flex flex-col">
            {/* Receiver Name */}
            <p className="font-bold text-lg">{receiverName}</p>
            
            {/* Item Name */}
            <p className="text-sm">
              <strong>Item:</strong> {itemName}
            </p>
            
            {/* Timestamp */}
            <p className="text-xs font-semibold text-gray-600">{timestamp}</p>
    
            {/* Preview */}
            <p className="text-sm text-gray-500 mt-2">{preview}</p>
          </div>
        </div>
      );
}

export default InboxItem;