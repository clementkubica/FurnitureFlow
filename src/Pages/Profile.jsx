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
      <div>
        <p>Email: {user.email}</p>
        <p>Additional Info: {JSON.stringify(user.additionalInfo)}</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center border border-darkgray border-[5px] h-[300px] w-1/2 max-w-[500px] m-[50px] rounded-[45px]        bgcolor-[background.paper]">
          <div className="mt-[-100px] flex items-center pb-[10px]">
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
          <h1 className="text-center text-[15px] mt-[10px]">
            {user.email || "Email"}
          </h1>
        </div>
        <Button>A</Button>
      </div>
    </>
  );
}
