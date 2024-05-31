import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Admin = () => {
  const { cookies, chosenUser } = useContext(UserContext);
  const name = cookies.User;

  return (
    <>
      <div className="w-[80%] mx-auto my-5">
        {chosenUser && name && (
          <div className="flex">
            <Sidebar />
            {/* Table */}
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
