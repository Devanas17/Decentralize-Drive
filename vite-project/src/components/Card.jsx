import React from "react";
import More from "../assets/more.png";

const Card = ({ item }) => {
  return (
    <div className="border rounded-md w-[260px] h-[200px] bg-gray-200">
      <img
        src={`https://gateway.pinata.cloud/ipfs/${item?.imgUrl.substring(6)}`}
        alt=""
        className="object-contain w-full h-[150px]"
      />
      <div className="bg-white h-[50px] flex items-center justify-between border-b rounded-b-md p-2 space-x-6">
        <h3 className="font-medium text-gray-600 truncate textsm">
          {item?.name}
        </h3>
        <img src={More} alt="" className="h-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default Card;
