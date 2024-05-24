import { Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
    </Routes>
  );
}

export default App;
