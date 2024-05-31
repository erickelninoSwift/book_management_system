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
  AlluserRegistered: null,
});

export const UserContextProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [currentUser, setCurrentUser] = useState(cookies.User);
  const [token, setToken] = useState(cookies.Token);
  const [login, setLogin] = useState(true);
  const [myUser, setMyUser] = useState(null);
  const [chosenUser, setChosenUser] = useState(null);
  const [AlluserRegistered, setAllusersRegisered] = useState(null);
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
    AlluserRegistered,
  };
  console.log(chosenUser);
  useEffect(() => {
    const verifyRoute = () => {
      axios
        .get("http://localhost:8080/verify", {
          headers: { authorization: `Bearer ${cookies.Token}` },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setChosenUser(response.data.user);
          }
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
  useEffect(() => {
    const handleFetchAllusers = async () => {
      await axios
        .get("http://localhost:8080/allusers")
        .then((response) => setAllusersRegisered(response.data.users))
        .catch((err) => {});
    };
    handleFetchAllusers();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
