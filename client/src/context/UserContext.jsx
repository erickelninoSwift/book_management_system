import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
export const UserContext = createContext({
  user: null,
  token: null,
  setCurrentUser: () => null,
  chosenUser: null,
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
  const [chosenUser, setChosenUser] = useState(null);
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
    chosenUser,
  };

  useEffect(() => {
    const verifyRoute = async () => {
      await axios
        .get("http://localhost:8080/verify", {
          headers: { authorization: `Bearer ${cookies.Token}` },
        })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.user);
            setChosenUser(response.data.user);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    verifyRoute();
  }, []);
  useEffect(() => {
    setToken(cookies.Token);
  }, [cookies]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
