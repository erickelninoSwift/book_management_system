import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UserContext = createContext({
  user: null,
  token: null,
  setCurrentUser: () => null,
  login: true,
  setLogin: () => null,
  myUser: null,
  setMyUser: () => null,
  cookies: null,
  setCookie: () => null,
  removeCookie: () => null,
  AlluserRegistered: null,
  setAllusersRegisered: () => null,
  alertDelete: false,
  setAlertDelete: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [currentUser, setCurrentUser] = useState(cookies.User);
  const [token, setToken] = useState(cookies.Token);
  const [login, setLogin] = useState(true);
  const [myUser, setMyUser] = useState(null);
  const [alertDelete, setAlertDelete] = useState(false);

  const [AlluserRegistered, setAllusersRegisered] = useState(null);
  const navigate = useNavigate();
  const value = {
    user: currentUser,
    setCurrentUser,
    token,
    login,
    setLogin,
    myUser,
    setMyUser,
    cookies,
    setCookie,
    removeCookie,
    AlluserRegistered,
    setAllusersRegisered,
    alertDelete,
    setAlertDelete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
