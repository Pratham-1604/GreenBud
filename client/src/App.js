import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Profile from "./pages/Profile";
import Buddies from "./pages/Buddies";
import Home from "./pages/Home";
import Notify from "./pages/Notify";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/buddies" element={<Buddies />} />
        <Route path="/notify" element={<Notify />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
