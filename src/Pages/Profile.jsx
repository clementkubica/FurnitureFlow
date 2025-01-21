import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../services/auth";
import { Button } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };
  const handleHome = async () => {
    navigate("/");
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img
          src="/images/logo_with_name.PNG"
          alt="App Logo with Title"
          className="w-3/4 max-w-[500px] mt-[20px] mb-[-65px]"
          onClick={handleHome}
        />
        {/*590px*/}
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
          {/* <div className="flex flex-col justify-center items-center border border-[#b4a3c4] border-[5px] h-[150px] w-[90%] mt-5 rounded-[30px] ">
            <h1>TEMP YOUR POSTS</h1>
          </div>
          <div className="flex flex-col justify-center items-center border border-[#b4a3c4] border-[5px] h-[150px] w-[90%] mt-5 rounded-[30px] ">
            <h1>TEMP YOUR LIKES</h1>
          </div> */}

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
      </div>
    </>
  );
}
