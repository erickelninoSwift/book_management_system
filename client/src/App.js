import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/AuthenticationPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import Allusers from "./pages/Allusers";
import AddContact from "./pages/AddContact";
import axios from "axios";
function App() {
  const navigate = useNavigate();
  const {
    token,
    chosenUser,
    removeCookie,
    setAllusersRegisered,
    AlluserRegistered,
  } = useContext(UserContext);
  const AuthToken = AlluserRegistered ? token : null;
  useEffect(() => {
    const handleFetchAllusers = async () => {
      await axios
        .get("http://localhost:8080/allusers")
        .then((response) => {
          if (!response.data.success && response.data.errorFound) {
            removeCookie("User");
            removeCookie("Token");
            setAllusersRegisered(false);
          }
          setAllusersRegisered(response.data.user);
          navigate("/admin/users");
        })
        .catch((err) => {});
    };
    handleFetchAllusers();
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!AuthToken && <Route index element={<Home />} />}
          {AuthToken && (
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<Allusers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="addcontact" element={<AddContact />} />
            </Route>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthenticationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
