import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Logged In");

    navigate("/me");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-gradient-to-t from-white to-green-300">
      <h1
        className="text-center text-white text-3xl bg-[#038373] py-2 w-full"
      >
        Login
      </h1>
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            placeholder="Name"
            required
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="button" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      </form>
      <Link to="/signup">
        <button className="text-cente pb-5">Need to sign up?</button>
      </Link>
    </div>
  );
};

export default Login;
