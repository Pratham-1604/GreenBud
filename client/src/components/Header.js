import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#038373] text-white">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        <h1 className="text-2xl font-semibold">G-Buddies</h1>
      </div>
      <div>
        <Link to="/login">
          <button className="button font-bold mr-2">Login</button>
        </Link>
        <Link to="/signup">
          <button className="button">Signup</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
