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
  const [details, setDetails] = useState(true);

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
        className={`h-screen w-full px-2 flex flex-col justify-center items-center bg-gradient-to-b from-white to-green-200 ${
          (pool || details) ? "filter blur-sm" : ""
        }`}
      >
        <div className="flex w-full justify-around items-center h-1/2">
          <LineGraph />
          <Details onPool={onPool} onDetails={onDetails} />
        </div>
        <div className="h-1/2 flex justify-center w-[70%] py-2">
            <Ride />
        </div>
      </div>
    </>
  );
}

export default Profile;
