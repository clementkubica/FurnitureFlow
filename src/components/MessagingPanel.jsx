import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import MessageBubble from "./MessageBubble";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function MessagingPanel({ conversationId, selectedConversation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const q = query(
        collection(db, "messages"),
        where("inbox_item_id", "==", conversationId),
        orderBy("timestamp", "asc")
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No messages found for conversationId:", conversationId);
        setMessages([]);
        return;
      }

      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });

      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation?.users) return;

    const newMsg = {
      inbox_item_id: conversationId,
      sender_id: selectedConversation.users[0],
      text: newMessage,
      timestamp: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "messages"), newMsg);
      setMessages((prev) => [...prev, { id: Date.now(), ...newMsg }]);
      setNewMessage(""); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Messages Display */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Conversation {conversationId}</h2>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            sender={message.sender_id}
            timestamp={
                message.timestamp?.toDate
                  ? message.timestamp.toDate().toLocaleString()
                  : "No timestamp available"
              }
            isSender={message.sender_id === selectedConversation.users[0]}
          />
        ))}
      </div>

      {/* Message Input Bar */}
      <div className="p-4 border-t bg-white flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default MessagingPanel;
