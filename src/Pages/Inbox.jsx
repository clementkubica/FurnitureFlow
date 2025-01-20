import React, { useState } from "react";
import Navigation from "../components/Navigation";
import InboxItemList from "../components/InboxItemList";
import MessagingPanel from "../components/MessagingPanel";

function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation */}
      <div className="h-16">
        <Navigation showSearchBar={false} showFavorite={false} />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Inbox Item List */}
        <div className="w-1/3 border-r overflow-y-auto">
          <InboxItemList setSelectedConversation={setSelectedConversation} />
        </div>

        {/* Messaging Panel */}
        <div className="w-2/3 overflow-y-auto">
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

