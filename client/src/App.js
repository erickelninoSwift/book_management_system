import { Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/AuthenticationPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
function App() {
  const { token, user } = useContext(UserContext);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={user && token ? <Admin /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthenticationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
