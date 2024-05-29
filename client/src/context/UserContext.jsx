import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
export const UserContext = createContext({
  user: null,
  token: null,
  setCurrentUser: () => null,
  setToken: () => null,
  login: true,
  setLogin: () => null,
  myUser: null,
  setMyUser: () => null,
  cookies: null,
  setCookie: () => null,
  removeCookie: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [currentUser, setCurrentUser] = useState(cookies.User);
  const [token, setToken] = useState(cookies.Token);
  const [login, setLogin] = useState(true);
  const [myUser, setMyUser] = useState(null);
  const value = {
    user: currentUser,
    setCurrentUser,
    token,
    setToken,
    login,
    setLogin,
    myUser,
    setMyUser,
    cookies,
    setCookie,
    removeCookie,
  };
  console.log(token);
  console.log(currentUser);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
