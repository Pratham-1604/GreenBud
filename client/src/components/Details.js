import React from "react";

const Details = (props) => {
  return (
    <div className="flex flex-col w-[400px] h-2/3 justify-around items-start border rounded-lg p-3 bg-[hsl(173,96%,35%)]">
      <div className="flex justify-start w-full">
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile picture"
          />
        </div>
        <div className="ml-6 space-y-3">
          <h2 className="text-2xl text-white font-medium">R.Vikas</h2>
          <p className="text-lg font-medium text-white">9167543560</p>
          <p className="text-lg font-medium text-white">Carbon Emission Rate</p>
          <p className="text-md font-medium text-white">{props.rate} gm/km</p>
        </div>
      </div>
      <div className="flex justify-around w-full mt-4">
        <button
          className="button"
          onClick={props.onDetails}
        >
          Vehicle Details
        </button>
        <button
          className="button"
          onClick={props.onPool}
        >
          Pool Ride
        </button>
      </div>
    </div>
  );
};

export default Details;
