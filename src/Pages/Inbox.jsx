import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import InboxItemList from "../components/InboxItemList";
import MessagingPanel from "../components/MessagingPanel";

function Inbox() {
    const [selectedConversation, setSelectedConversation] = useState(null);
  
    return (
      <div className="h-screen flex flex-col">
        <Navigation showSearchBar={false} />
        <div className="flex flex-1">
          <div className="w-1/3 border-r">
            <InboxItemList setSelectedConversation={setSelectedConversation} />
          </div>
          <div className="w-2/3">
            {selectedConversation ? (
              <MessagingPanel
                conversationId={selectedConversation.id}
                selectedConversation={selectedConversation} // Pass the full object
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a conversation to view messages.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  

export default Inbox;

