import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Profile() {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center border border-black h-[300px] w-1/2 max-w-[500px] m-[50px]">
          <div style={{ fontSize: 75, marginTop: -150 }}>
            <AccountCircleIcon fontSize="0" />
          </div>
        </div>
      </div>
    </>
  );
}
