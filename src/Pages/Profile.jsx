import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../services/auth";
import { Button } from "@mui/material";

export default function Profile() {
  const user = useAuth();
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center border border-[#b4a3c4] border-[5px] h-[620px] w-3/4 max-w-[500px] mt-[100px] rounded-[45px] bg-[#d6c3dc]">
          <div className="mt-[50px] flex items-center pb-[10px]">
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
          <div className="flex flex-col justify-center items-center border border-[#b4a3c4] border-[5px] h-[150px] w-[90%] mt-5 rounded-[30px] ">
            <h1>TEMP YOUR POSTS</h1>
          </div>
          <div className="flex flex-col justify-center items-center border border-[#b4a3c4] border-[5px] h-[150px] w-[90%] mt-5 rounded-[30px] ">
            <h1>TEMP YOUR LIKES</h1>
          </div>
          <div className="mt-5">
            <h1></h1>
            <Button>NON-FUNCTIONAL LOGOUT TEMP</Button>
          </div>
        </div>
      </div>
    </>
  );
}
