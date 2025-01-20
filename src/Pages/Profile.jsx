import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../services/auth";

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
        <div className="flex flex-col justify-center items-center border border-black h-[300px] w-1/2 max-w-[500px] m-[50px]">
          <div style={{ fontSize: 75, marginTop: -150, alignItems: "center" }}>
            <AccountCircleIcon fontSize="0" />
          </div>
          <img src={user.photoURL} className="rounded-full size-[63px]"></img>
          <h1 className="text-center text-[20px]">
            {user.displayName || "User"}
          </h1>
        </div>
      </div>
    </>
  );
}
