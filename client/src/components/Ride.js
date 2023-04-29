import React, { useState } from "react";
import { toast } from "react-toastify";

function Ride() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    mileage: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form.source, form.destination, form.mileage);

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
              Route
            </label>
            <p id="route" className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              minima enim aut, ratione inventore molestias quidem quis et unde
              illo?
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
                148 KM
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
                3 Hours 21 Mins
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
              11 Litres
            </p>
          </div>
        </div>
        <div className="w-[45%] bg-[#00CC8E] rounded-lg p-4 shadow-lg">
          <div className="">
            <label htmlFor="route" className="text-white text-xl mb-2">
              Route
            </label>
            <p id="route" className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              minima enim aut, ratione inventore molestias quidem quis et unde
              illo?
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
                148 KM
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
                3 Hours 21 Mins
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
              11 Litres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ride;
