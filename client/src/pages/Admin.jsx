import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Admin = () => {
  const { cookies } = useContext(UserContext);
  const AuthToken = cookies.Token;

  return (
    <>
      <div className="w-[80%] mx-auto my-5">
        {AuthToken && (
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
