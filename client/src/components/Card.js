import React from "react";

function Card(props) {
    return (
        <div className="flex flex-col items-center">
        <img src={props.img} alt="records" className="w-1/2" />
        <p className="text-white mt-5">{props.title}</p>
      </div>
    )
}

export default Card;
