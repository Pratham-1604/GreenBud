import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Form(props) {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    capacity: 1,
    time: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form.source, form.destination, form.capacity, form.time);
    toast.success("Ready to go!");

    props.onClick();
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6 w-1/2 absolute z-50 left-1/4 right-1/4 top-1/4">
      <h2 className="text-lg font-medium mb-4">Enter Travelling Details</h2>
      <form>
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
            type="time"
            id="time"
            value={form.time}
            onChange={(e) => handleFormFieldChange("time", e)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-between">
          <Link to="/buddies">
            <p
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >Find Your Buddies </p>
          </Link>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
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
