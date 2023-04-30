import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Travelling() {
  const [form, setForm] = useState("");
  const [men, setMen] = useState({
    distance: "",
    route: [],
  });

  const handleFormFieldChange = (e) => {
    setForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const output = form.split(",").map((item) => item.trim());

    const apiUrl =
      "https://32ba-2409-40c0-7a-b031-d069-143e-694e-9ffe.ngrok-free.app";
    const endpoint = "/tsp";

    const payload = {
      places: output,
    };

    axios
      .post(apiUrl + endpoint, payload)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        const { shortest_distance_kms: sd, shortest_route: sr } = response.data;

        setMen({
          distance: sd,
          route: sr,
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    setForm("");
    toast.success("Ready to go!");
  };

  const seq = men.route;

  return (
    <div className="h-screen">
      <div className="flex justify-between w-full py-2 items-center p-4 shadow-lg">
        <div className="flex justify-around items-center w-2/3">
          <input
            type="text"
            id="source"
            placeholder="Virar,Borivali,Dadar"
            value={form}
            onChange={(e) => handleFormFieldChange(e)}
            className="w-3/4 border border-gray-300 rounded-md p-2"
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

      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid place-content-center h-96">
            <p className="text-gray-800 text-lg font-semibold mb-4">
              {men.distance}
            </p>
            <ul className="list-disc pl-6">
              {seq.map((item, index) => (
                <li className="text-gray-700 text-base mb-2" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Travelling;
