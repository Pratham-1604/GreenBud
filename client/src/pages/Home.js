import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className=" bg-gradient-to-t from-white to-green-200">
      <Header />
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-5">
        <p className="text-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
          doloribus.
        </p>
        <p className="text-2xl">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="h-screen w-full flex flex-col justify-between items-center space-x-5 py-10">
        <p className="text-4xl">Lorem ipsum dolor sit amet Lorem, ipsum.</p>
        <div className="flex w-1/2 justify-between">
          <Card
            image="https://via.placeholder.com/400x200"
            title="Example Card"
            description="This is an example of a card component in React"
          />
          <Card
            image="https://via.placeholder.com/400x200"
            title="Example Card"
            description="This is an example of a card component in React"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
