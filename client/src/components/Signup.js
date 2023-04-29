import React, { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    navigate('/me')
    toast.success("Hello Buddy");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-gradient-to-t from-white to-green-300">
      <h1 className="text-center text-white text-3xl bg-[#038373] py-2 w-full">
        SignUp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => handleFormFieldChange("name", e)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => handleFormFieldChange("email", e)}
          />
        </div>
        <div className="mb-4">
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
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => handleFormFieldChange("password", e)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p></p>
        </div>
      </form>
      <Link to="/login">
        <button className="text-center pb-5">Already have an account?</button>
      </Link>
    </div>
  );
};

export default Signup;
