import React, { useState } from "react";
import InboxItem from "./InboxItem";
import { useAuth } from "../services/auth";
import { db } from "../firebase/FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";

function InboxItemList({
  setSelectedConversation,
  selectedConversation,
  inboxItems,
  setInboxItems,
}) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString() + ", " + date.toLocaleDateString();
  };

  function getReceiverUid(users) {
    return users[0] === user.uid ? users[1] : users[0];
  }

  const confirmDeleteInboxItem = (itemId) => {
    setItemToDelete(itemId);
    setDialogOpen(true);
  };

  const handleConfirmedDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      const inboxCollection = collection(db, "inbox_items");
      const inboxQuery = query(
        inboxCollection,
        where("item_id", "==", itemToDelete)
      );
      const inboxDocs = await getDocs(inboxQuery);

      if (!inboxDocs.empty) {
        const inboxItemId = inboxDocs.docs[0].id;

        const messagesQuery = query(
          collection(db, "messages"),
          where("inbox_item_id", "==", inboxItemId)
        );
        const messagesDocs = await getDocs(messagesQuery);

        if (!messagesDocs.empty) {
          const messageBatch = writeBatch(db);
          messagesDocs.forEach((doc) => messageBatch.delete(doc.ref));
          await messageBatch.commit();
        }

        const inboxBatch = writeBatch(db);
        inboxDocs.forEach((doc) => inboxBatch.delete(doc.ref));
        await inboxBatch.commit();
      }

      setInboxItems((prevItems) =>
        prevItems.filter((item) => item.item_id !== itemToDelete)
      );
      setSnackbarMessage("Conversation deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting conversation:", error);
      setSnackbarMessage("Failed to delete conversation. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div
      className="p-4 overflow-y-auto border-r bg-white"
      style={{ maxHeight: "100vh", height: "100%" }}
    >
      {inboxItems.length > 0 ? (
        inboxItems.map((item) => (
          <InboxItem
            key={item.id}
            receiverUid={getReceiverUid(item.users)}
            itemId={item.item_id}
            timestamp={formatTimestamp(item.timestamp)}
            preview={item.preview || "No preview available"}
            isSelected={
              selectedConversation && selectedConversation.id === item.id
            }
            onClick={() => setSelectedConversation(item)}
            onDelete={() => confirmDeleteInboxItem(item.item_id)}
          />
        ))
      ) : (
        <p className="text-gray-500">No conversations available</p>
      )}

      <Backdrop open={isDeleting} style={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmedDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InboxItemList;
