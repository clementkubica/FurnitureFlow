import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import InboxItemList from "../components/InboxItemList";
import MessagingPanel from "../components/MessagingPanel";
import { useLocation } from "react-router-dom";
import { useAuth } from "../services/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { getConversationByUserAndItem } from "../services/firestore";


function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const location = useLocation()
  const {user} = useAuth()
  const [inboxItems, setInboxItems] = useState([]);

  useEffect(() => {
    if (user) {
      if (location.state) {
          const { item } = location.state
          getConversationByUserAndItem(user.uid, item.item_id).then(conv => {
            if (conv === null) {
              const newConversation = {
                id: crypto.randomUUID(),
                item_id: item.item_id,
                users: [
                  user.uid,
                  item.user_id
                ],
              }
  
              setSelectedConversation(newConversation)
              fetchInboxItems(newConversation)
            }
            else {
              setSelectedConversation(conv)
              fetchInboxItems(null)
            }
  
            window.history.replaceState({}, '')
          })
      }
      else {
        fetchInboxItems(null)
      }
    }
    else {
      console.error("user not found")
    }
  }, [])

  const fetchInboxItems = async (newInboxItem) => {
    try {
      // right now we're fetching all of the inbox_items from the collection
      // soon, we need to change it so that we're fetching all of the inbox_items where the current user's id is in the users array
      const inboxCollection = collection(db, "inbox_items")
      const q = query(inboxCollection, where("users", "array-contains", user.uid), orderBy("timestamp", "desc"))
      const querySnapshot = await getDocs(q)
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      
      if (newInboxItem) {
        setInboxItems([newInboxItem, ...items]);
      }
      else {
        setInboxItems(items)
      }
      
    } catch (error) {
      console.error("Error fetching inbox items:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navigation */}
      <Navigation showSearchBar={false}/>

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Inbox Item List */}
        <div className="w-1/3 border-r overflow-y-auto">
          <InboxItemList selectedConversation={selectedConversation} inboxItems={inboxItems} setSelectedConversation={setSelectedConversation} />
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
