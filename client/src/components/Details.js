import React from "react";

const Details = (props) => {
  return (
    <div className="flex flex-col w-[400px] h-1/2 items-start border rounded-lg p-6">
      <div className="flex justify-start w-full">
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile picture"
          />
        </div>
        <div className="ml-6 space-y-4">
          <h2 className="text-2xl font-medium text-gray-900">R.Vikas</h2>
          <p className="text-lg font-medium text-gray-500">9167543560</p>
        </div>
      </div>
      <div className="flex justify-around w-full mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.onDetails}
        >
          Vehicle Details
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={props.onPool}
        >
          Pool Ride
        </button>
      </div>
    </div>
  );
};

export default Details;
