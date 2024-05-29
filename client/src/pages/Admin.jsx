import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Admin = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-red-200 h-screen w-[1260px] my-[20px] mx-auto flex justify-center items-center">
      <p>
        Welcome , <span className="text-lg font-semibold">{user}</span>
      </p>
    </div>
  );
};

export default Admin;
