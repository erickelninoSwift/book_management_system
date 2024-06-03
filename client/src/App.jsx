import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/AuthenticationPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import Allusers from "./pages/Allusers";
import AddContact from "./pages/AddContact";
import EditPage from "./pages/EditPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />

          <Route
            path="admin"
            element={
              <ProtectedRoutes>
                <Admin />
              </ProtectedRoutes>
            }
          >
            <Route path="users" element={<Allusers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addcontact" element={<AddContact />} />
            <Route path="edit/:id/:postedBy" element={<EditPage />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthenticationPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
