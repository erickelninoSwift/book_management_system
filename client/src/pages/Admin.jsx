import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Admin = () => {
  const { cookies } = useContext(UserContext);
  const name = cookies.User;
  return (
    <div className="bg-red-200 h-screen w-[1260px] my-[20px] mx-auto flex justify-center items-center">
      <p>
        Welcome , <span className="text-lg font-semibold">{name}</span>
      </p>
    </div>
  );
};

export default Admin;
