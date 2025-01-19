import React, { useState } from "react";
import Navigation from "../components/Navigation";
import InboxItemList from "../components/InboxItemList";
import MessagingPanel from "../components/MessagingPanel";

function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navigation showSearchBar={false} />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Inbox List (Left Panel) */}
        <div className="w-1/3 border-r border-gray-300">
          <InboxItemList setSelectedConversation={setSelectedConversation} />
        </div>

        {/* Messaging Panel (Right Panel) */}
        <div className="w-2/3">
          <MessagingPanel conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
}

export default Inbox;
