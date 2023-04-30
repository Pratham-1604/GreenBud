import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from 'axios'

function Form(props) {
  const [form, setForm] = useState({
    name: "",
    source: "",
    destination: "",
    time: "",
    capacity: 1,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl =
      "https://32ba-2409-40c0-7a-b031-d069-143e-694e-9ffe.ngrok-free.app";
    const endpoint = "/pooling";

    const payload = {
      name: form.name,
      origin: form.source,
      destination: form.destination,
      time: `${form.time}:00`,
      capacity: form.capacity
    };

    axios
      .post(apiUrl + endpoint, payload)
      .then((response) => {
        // Handle success response

        props.setResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    props.onClick();
    toast.success("Ready to go!");
  };

  return (
    <div className="bg-gradient-to-t from-green-100 to-white rounded-md shadow-md p-6 w-1/2 absolute z-50 left-1/4 right-1/4 mt-10">
      <h2 className="text-lg font-medium mb-4">Enter Travelling Details</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => handleFormFieldChange("name", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="source" className="block font-medium mb-2">
            Your Location
          </label>
          <input
            type="text"
            id="source"
            value={form.source}
            onChange={(e) => handleFormFieldChange("source", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block font-medium mb-2">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={form.destination}
            onChange={(e) => handleFormFieldChange("destination", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block font-medium mb-2">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            value={form.capacity}
            onChange={(e) => handleFormFieldChange("capacity", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block font-medium mb-2">
            Time
          </label>
          <input
            type="datetime-local"
            id="time"
            value={form.time}
            onChange={(e) => handleFormFieldChange("time", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-between">
          <Link to="/buddies">
            <p className="button">Find Your Buddies </p>
          </Link>
          <div>
            <button onClick={handleSubmit} type="submit" className="button">
              Submit
            </button>
            <button
              type="button"
              className="button"
              onClick={props.onClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
