import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const ProtectedRoutes = ({ children }) => {
  const { cookies } = useContext(UserContext);

  return cookies.Token ? children : <Navigate to={"/login"} replace />;
};

export default ProtectedRoutes;
