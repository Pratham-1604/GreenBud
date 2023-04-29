import React, { useState } from "react";
import { toast } from "react-toastify";

function Request() {
  const [content, setContent] = useState("Request");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    console.log(message);

    toast.success('Request Sent')
    setContent("Request Sent!");
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 m-4 bg-gray-200 shadow-md">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/48"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-gray-500">john.doe@example.com</p>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={handleMessageChange}
          className="border border-gray-400 rounded px-2 py-1"
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded ml-4"
          onClick={handleClick}
        >
          {content}
        </button>
      </div>
    </div>
  );
}

export default Request;
