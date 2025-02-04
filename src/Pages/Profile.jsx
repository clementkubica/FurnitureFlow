import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../services/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";
import Navigation from "../components/Navigation";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import MediaCard from "../components/MediaCard";
import { Box, IconButton, Typography, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Backdrop, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { writeBatch, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setLoadingPosts(true);
      axios
        .post("https://getuserposts-jbhycjd2za-uc.a.run.app", { user_id: user.uid })
        .then((response) => setUserPosts(response.data))
        .catch((error) => console.error("Error fetching user posts:", error))
        .finally(() => setLoadingPosts(false));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  const confirmDeletePost = (item_id) => {
    setPostToDelete(item_id);
    setDialogOpen(true);
  };

  const handleConfirmedDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);

    try {
      // Fetch all inbox_items related to this post from Firestore
      const inboxCollection = collection(db, "inbox_items");
      const inboxQuery = query(inboxCollection, where("item_id", "==", postToDelete));
      const inboxDocs = await getDocs(inboxQuery);

      // Collect inbox_item_ids
      const inboxItemIds = inboxDocs.docs.map(doc => doc.id);

      if (inboxItemIds.length > 0) {
        // Delete all messages linked to each inbox_item_id
        for (const inboxItemId of inboxItemIds) {
          const messagesQuery = query(collection(db, "messages"), where("inbox_item_id", "==", inboxItemId));
          const messagesDocs = await getDocs(messagesQuery);

          const messageBatch = writeBatch(db);
          messagesDocs.forEach((doc) => messageBatch.delete(doc.ref));
          await messageBatch.commit();
        }

        // Delete the inbox_items after deleting their messages
        const inboxBatch = writeBatch(db);
        inboxDocs.forEach((doc) => inboxBatch.delete(doc.ref));
        await inboxBatch.commit();
      }

      // Call backend to delete records
      await axios.post("https://deleteuserpost-jbhycjd2za-uc.a.run.app", {
        user_id: user.uid,
        item_id: postToDelete,
      });

      // Update UI to remove deleted post
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.item_id !== postToDelete));
      setSnackbarMessage("Post deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      setSnackbarMessage("Failed to delete post. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setIsDeleting(false);
      setDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 1, numScroll: 1 },
    { breakpoint: "600px", numVisible: 1, numScroll: 1 },
  ];

  const customNext = ({ onClick }) => (
    <IconButton onClick={onClick}>
      <ArrowForwardIosIcon fontSize="large" />
    </IconButton>
  );

  const customPrev = ({ onClick }) => (
    <IconButton onClick={onClick}>
      <ArrowBackIosNewIcon fontSize="large" />
    </IconButton>
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Navigation showSearchBar={false} />
        <div className="flex flex-col items-center border border-[#b4a3c4] border-[5px] h-[auto] w-3/4 max-w-[500px] mt-[100px] mb-10 pb-7 rounded-[45px] bg-[#d6c3dc]">
          <div className="mt-[30px] flex items-center pb-[10px]">
            {user.photoURL ? (
              <img src={user.photoURL} className="rounded-full size-[63px]" alt="Profile" />
            ) : (
              <AccountCircleIcon fontSize="large" className="text-[70px]" />
            )}
          </div>
          <h1 className="text-center text-[20px]">{user.displayName || "User"}</h1>
          <h1 className="text-center text-[auto] mt-[10px]">{user.email || "Email"}</h1>

          <div className="mt-5">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center text-black hover:text-red-500 cursor-pointer"
                aria-label="Logout"
                title="Logout"
              >
                <FaSignOutAlt className="text-[25px] text-xl mr-1" />
                <h5 className="mt-[-7px] text-[25px] ml-1">Log Out</h5>
              </button>
            )}
          </div>
        </div>

        <Backdrop open={isDeleting} style={{ zIndex: 1300, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {loadingPosts ? (
          <Box className="flex justify-center items-center mt-5">
            <CircularProgress />
          </Box>
        ) : (
          <Box className="w-full max-w-3xl mt-5">
            <Typography variant="h6" className="text-center mb-3">
              Your Posts
            </Typography>

            {userPosts.length > 0 ? (
              userPosts.length > 1 ? (
                <Carousel
                  value={userPosts}
                  numVisible={1}
                  numScroll={1}
                  responsiveOptions={responsiveOptions}
                  circular
                  autoplayInterval={3000}
                  itemTemplate={(post) => (
                    <Box className="flex justify-center">
                      <MediaCard item={post} size={100} onDelete={() => confirmDeletePost(post.item_id)} />
                    </Box>
                  )}
                  nextIcon={customNext}
                  prevIcon={customPrev}
                  showIndicators
                />
              ) : (
                <Box className="flex justify-center">
                  <MediaCard item={userPosts[0]} size={100} onDelete={() => confirmDeletePost(userPosts[0].item_id)} />
                </Box>
              )
            ) : (
              <Typography className="text-center text-gray-600">No posts yet.</Typography>
            )}
          </Box>
        )}
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog for Deleting Posts */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
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
    </>
  );
}