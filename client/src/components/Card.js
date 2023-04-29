import React from "react";

function Card({ image, title, description }) {
  return (
    <div class="w-64 h-96  bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-300">
  <img class="w-full h-1/2 object-cover" src={image} alt="Feature Image" />
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-2">{title}</h2>
    <p class="text-gray-700 text-base">{description}</p>
  </div>
</div>

  );
}

export default Card;
