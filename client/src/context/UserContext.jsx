import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  token: null,
  setCurrentUser: () => null,
  setToken: () => null,
  login: false,
  setLogin: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState(false);
  const value = {
    user: currentUser,
    setCurrentUser,
    token,
    setToken,
    login,
    setLogin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
