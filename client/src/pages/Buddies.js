import React, { useState } from "react";
import { toast } from "react-toastify";
import Request from "../components/Request";


function Buddies() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    time: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form.source, form.destination);

    setForm({
      source: "",
      destination: "",
      time: ""
    });
    toast.success("Ready to go!");
  };

  return (
    <div className="h-screen">

      <div className="flex justify-between w-full py-2 items-center p-4 shadow-lg">
        <div className="flex justify-around items-center w-2/3">
          <input
            type="text"
            id="source"
            placeholder="Source"
            value={form.source}
            onChange={(e) => handleFormFieldChange("source", e)}
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={(e) => handleFormFieldChange("destination", e)}
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
          <input
            type="time"
            id="time"
            value={form.time}
            onChange={(e) => handleFormFieldChange("time", e)}
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="w-1/3 grid place-content-center ">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-2 py-2  rounded-md w-40"
            onClick={handleSubmit}
          >
            Buddies
          </button>
        </div>
      </div>

      <div className="">
      <Request />
      <Request />
      <Request />
      </div>
    </div>
  );
}

export default Buddies;
