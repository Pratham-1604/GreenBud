import React from "react";
import { useState } from "react";
import Form from "../components/Form";
import CarForm from "../components/CarForm";
import Details from "../components/Details";
import LineGraph from "../components/LineGraph";
import Ride from "../components/Ride";
import Navbar from "../components/Navbar";

function Profile() {
  const [pool, setPool] = useState(false);
  const [details, setDetails] = useState(false);

  const onPool = () => {
    setPool((prev) => !prev);
  };

  const onDetails = () => {
    setDetails((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      {pool && <Form onClick={onPool} />}
      {details && <CarForm onClick={onDetails} />}
      <div
        className={`h-screen w-full px-2 flex flex-col justify-center items-center ${
          pool ? "filter blur-sm" : ""
        }`}
      >
        <div className="flex w-full justify-around items-center h-1/2">
          <LineGraph />
          <Details onPool={onPool} onDetails={onDetails} />
        </div>
        <div className="h-1/2 w-full py-2">
          <div className="w-2/3 h-full">
            <Ride />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
