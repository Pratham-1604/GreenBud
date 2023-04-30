import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Ride() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    mileage: "",
  });

  const [time, setTime] = useState({
    distance_time: "",
    duration_time: "",
    consumption_time: "",
    route_time: "",
  });

  const [fuel, setFuel] = useState({
    distance_fuel: "",
    duration_fuel: "",
    consumption_fuel: "",
    route_fuel: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl =
      "https://32ba-2409-40c0-7a-b031-d069-143e-694e-9ffe.ngrok-free.app";
    const endpoint = "/fuel";

    const payload = {
      origin: form.source,
      destination: form.destination,
      mileage: Number(form.mileage),
    };

    axios
      .post(apiUrl + endpoint, payload)

      .then((response) => {
        // Handle success response
        const {
          lowest_fuel_consumption_route: lf,
          lowest_time_taken_route: lt,
        } = response.data;

        setTime({
          distance_time: lt.distance,
          duration_time: lt.duration,
          consumption_time: lt.fuel_consumption_litres,
          route_time: lt.summary
        });
      
        setFuel({
          distance_fuel: lf.distance,
          duration_fuel: lf.duration,
          consumption_fuel: lf.fuel_consumption_litres,
          route_fuel: lf.summary
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    setForm({
      source: "",
      destination: "",
      mileage: "",
    });
    toast.success("Ready to go!");
  };
  return (
    <div className="flex flex-col rounded-lg items-center justify-between bg-[hsl(173,96%,35%)]  h-full shadow-2xl">
      <div className="flex justify-between w-full py-2 px-4 rounded-lg ">
        <div className="mb-4 flex justify-around  w-2/3 h-full ">
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
            type="text"
            id="mileage"
            placeholder="Mileage"
            value={form.mileage}
            onChange={(e) => handleFormFieldChange("mileage", e)}
            className="w-1/4 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="w-1/3 grid place-content-center ">
          <button className="button" onClick={handleSubmit}>
            Ride
          </button>
        </div>
      </div>

      <div className="flex justify-around content-center py-2">
        <div className="w-[45%] bg-[#00CC8E] rounded-lg p-4 shadow-lg">
          <div className="">
            <label htmlFor="route" className="text-white text-xl mb-2">
              Quicker Route
            </label>
            <p id="route" className="text-black">
              {time.route_time}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="distance"
                className="text-xl text-white font-medium mb-2"
              >
                Distance
              </label>
              <p id="distance" className="text-black">
                {time.distance_time}
              </p>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="text-white text-xl font-medium mb-2"
              >
                Duration
              </label>
              <p id="duration" className="text-black">
                {time.duration_time}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fuel"
              className="text-white text-xl font-medium mb-2"
            >
              Fuel Consumption
            </label>
            <p id="fuel" className="text-black">
              {time.consumption_time}
            </p>
          </div>
        </div>
        <div className="w-[45%] bg-[#00CC8E] rounded-lg p-4 shadow-lg">
          <div className="">
            <label htmlFor="route" className="text-white text-xl mb-2">
              Greener Route
            </label>
            <p id="route" className="text-black">
              {fuel.route_fuel}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="distance"
                className="text-xl text-white font-medium mb-2"
              >
                Distance
              </label>
              <p id="distance" className="text-black">
                {fuel.distance_fuel}
              </p>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="text-white text-xl font-medium mb-2"
              >
                Duration
              </label>
              <p id="duration" className="text-black">
                {fuel.duration_fuel}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fuel"
              className="text-white text-xl font-medium mb-2"
            >
              Fuel Consumption
            </label>
            <p id="fuel" className="text-black">
              {fuel.consumption_fuel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ride;
