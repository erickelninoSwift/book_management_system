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
import EditPage from "./pages/EditPage";
function App() {
  const { cookies } = useContext(UserContext);
  const AuthToken = cookies.Token;
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!AuthToken && <Route path="home" element={<Home />} />}
          {AuthToken && (
            <Route path="admin" element={<Admin />}>
              <Route path="users" element={<Allusers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="addcontact" element={<AddContact />} />
              <Route path="edit/:id" element={<EditPage />} />
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
