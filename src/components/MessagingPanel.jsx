import React, { useEffect, useRef, useState } from "react";
import { collection, query, where, orderBy, getDocs, addDoc, Timestamp, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import MessageBubble from "./MessageBubble";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../services/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#BA68C8",
    },
  },
});

function MessagingPanel({ conversationId, selectedConversation }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isFirstMsg, setIsFirstMsg] = useState(false)
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()

  const fetchMessages = async () => {
    setIsLoading(true)
    if (!conversationId) {
      setIsLoading(false)
      return
    }

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
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoading(false)
    }

    
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation?.users) return;

    const newMsg = {
      inbox_item_id: conversationId,
      sender_id: user.uid,
      text: newMessage,
      timestamp: Timestamp.now(),
    };

    if (isFirstMsg) {
      try {
        await setDoc(doc(db, "inbox_items", conversationId), {
          item_id: selectedConversation.item_id,
          users: selectedConversation.users,
          preview: newMsg.text,
          timestamp: newMsg.timestamp,
        })
      }
      catch(error) {
        console.error("Error creating new conversation:", error)
      }
    }
    else {
      try {
        await updateDoc(doc(db, "inbox_items", conversationId), {
          preview: newMsg.text,
          timestamp: newMsg.timestamp, 
        })
      }
      catch(error) {
        console.error("Error updating conversation", error)
      }
    }

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsLoading(true)
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();

    if (messages.length === 0) {
      setIsFirstMsg(true)
    }
    else {
      setIsFirstMsg(false)
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Messages Display */}
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        {isLoading ?
          <div className="text-gray-500 flex items-center justify-center text-center h-full">
            Loading...
          </div>
          :
          <>
            {isFirstMsg ?
            <div className="text-gray-500 flex items-center justify-center text-center h-full">
              Send your first message!
            </div>
            :
            <>
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
                  isSender={message.sender_id === user.uid}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
            }
          </>
        }
      </div>

      {/* Message Input Bar */}
      {!isLoading && 
        <div className="p-4 border-t bg-white flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </ThemeProvider>
        </div>
      }
    </div>
  );
}

export default MessagingPanel;