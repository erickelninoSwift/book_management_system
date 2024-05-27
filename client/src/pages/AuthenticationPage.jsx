import React, { useState, useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/UserContext";
const AuthenticationPage = () => {
  const { login } = useContext(UserContext);
  return (
    <>
      <div className="h-[80vh]">
        {login && <Login />}
        {!login && <Register />}
      </div>
    </>
  );
};

export default AuthenticationPage;
