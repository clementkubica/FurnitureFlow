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
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { Snackbar, Alert } from "@mui/material";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .post("https://getuserposts-jbhycjd2za-uc.a.run.app", {
          user_id: user.uid,
        })
        .then((response) => {
          setUserPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user posts:", error);
        });
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

  const handleDeletePost = async (item_id) => {
    try {
      const inboxCollection = collection(db, "inbox_items");
      const inboxQuery = query(inboxCollection, where("item_id", "==", item_id));
      const inboxDocs = await getDocs(inboxQuery);

      const batchDelete = inboxDocs.docs.map(async (doc) => await deleteDoc(doc.ref));
      await Promise.all(batchDelete);

      await axios.post("https://deleteuserpost-jbhycjd2za-uc.a.run.app", {
        user_id: user.uid,
        item_id: postId,
      });

      setUserPosts((prevPosts) => prevPosts.filter((post) => post.item_id !== postId));
      setSnackbarMessage("Post and messages deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
              <img
                src={user.photoURL}
                className="rounded-full size-[63px]"
              ></img>
            ) : (
              <div className="text-[70px]">
                <AccountCircleIcon fontSize="0" />
              </div>
            )}
          </div>
          <h1 className="text-center text-[20px]">
            {user.displayName || "User"}
          </h1>
          <h1 className="text-center text-[auto] mt-[10px]">
            {user.email || "Email"}
          </h1>

          <div className="mt-5">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-cetner text-black hover:text-red-500 cursor-pointer"
                aria-label="Logout"
                title="Logout"
              >
                <FaSignOutAlt className="text-[25px] text-xl mr-1" />
                <h5 className="mt-[-7px] text-[25px] ml-1">Log Out</h5>
              </button>
            )}
          </div>
        </div>

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
                  <MediaCard item={post} size={100} onDelete={handleDeletePost}/>
                </Box>
              )}
              nextIcon={customNext}
              prevIcon={customPrev}
              showIndicators
            />
            ) : (
              <Box className="flex justify-center">
                <MediaCard item={userPosts[0]} size={100} onDelete={handleDeletePost}/>
              </Box>
            )
          ) : (
            <Typography className="text-center text-gray-600">
              No posts yet.
            </Typography>
          )}
        </Box>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}