import { Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/AuthenticationPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
