import React, { useState, useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/UserContext";
const AuthenticationPage = () => {
  const { login } = useContext(UserContext);
  return (
    <>
      {login && <Login />}
      {!login && <Register />}
    </>
  );
};

export default AuthenticationPage;
