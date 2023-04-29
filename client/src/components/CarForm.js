import React, { useState } from "react";
import { toast } from "react-toastify";

function Form(props) {
  const [form, setForm] = useState({
    car_id: 0,
    manufacturer: "",
    model: "",
    description: "",
    transmission: "",
    transmission_type: "",
    engine_size_cm3: 0,
    fuel: "",
    powertrain: "",
    power_ps: 0,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log();
    toast.success("Ready to go!");

    props.onClick();
  };

  return (
    <div className="bg-green-200 rounded-md shadow-md p-6 w-1/2 absolute z-50 left-1/4 right-1/4 mt-10">
      <h2 className="text-lg font-medium mb-4">Enter Car Details</h2>
      <form className="h-[500px] overflow-auto">
        <div className="mb-4">
          <label htmlFor="car_id" className="block font-medium mb-2">
            Car ID
          </label>
          <input
            type="number"
            id="car_id"
            value={form.car_id}
            onChange={(e) => handleFormFieldChange("car_id", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="manufacturer" className="block font-medium mb-2">
            Manufacturer
          </label>
          <input
            type="text"
            id="manufacturer"
            value={form.manufacturer}
            onChange={(e) => handleFormFieldChange("manufacturer", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block font-medium mb-2">
            Model
          </label>
          <input
            type="text"
            id="model"
            value={form.model}
            onChange={(e) => handleFormFieldChange("model", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={form.description}
            onChange={(e) => handleFormFieldChange("description", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="transmission" className="block font-medium mb-2">
            Transmission
          </label>
          <input
            type="text"
            id="transmission"
            value={form.transmission}
            onChange={(e) => handleFormFieldChange("transmission", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="transmission_type" className="block font-medium mb-2">
            Transmission Type
          </label>
          <input
            type="text"
            id="transmission_type"
            value={form.transmission_type}
            onChange={(e) => handleFormFieldChange("transmission_type", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="engine_size_cm3" className="block font-medium mb-2">
            Engine Size
          </label>
          <input
            type="number"
            id="engine_size_cm3"
            value={form.engine_size_cm3}
            onChange={(e) => handleFormFieldChange("engine_size_cm3", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fuel" className="block font-medium mb-2">
            Fuel
          </label>
          <input
            type="text"
            id="fuel"
            value={form.fuel}
            onChange={(e) => handleFormFieldChange("fuel", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="powertrain" className="block font-medium mb-2">
            Powertrain
          </label>
          <input
            type="text"
            id="powertrain"
            value={form.powertrain}
            onChange={(e) => handleFormFieldChange("powertrain", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="power_ps" className="block font-medium mb-2">
            Power PS
          </label>
          <input
            type="number"
            id="power_ps"
            value={form.power_ps}
            onChange={(e) => handleFormFieldChange("power_ps", e)}
            className="w-1/2 border border-gray-300 rounded-md p-2"
          />
        </div>
      </form>
        <div className="flex justify-end mt-5">
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 button"
            >
              Submit
            </button>
            <button
              type="button"
              className="ml-2 button bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              onClick={props.onClick}
            >
              Cancel
            </button>
          </div>
        </div>
    </div>
  );
}

export default Form;
