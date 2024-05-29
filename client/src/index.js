import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
