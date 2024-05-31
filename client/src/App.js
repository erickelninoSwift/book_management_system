import { Routes, Route } from "react-router-dom";
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
function App() {
  const { token, chosenUser } = useContext(UserContext);
  const AuthToken = chosenUser ? token : null;
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!AuthToken && <Route index element={<Home />} />}
          {AuthToken && (
            <Route path="/admin/" element={<Admin />}>
              <Route index element={<Allusers />} />
              <Route path="profile" element={<Profile />} />
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
