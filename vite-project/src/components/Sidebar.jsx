import React from "react";
import Plus from "../assets/plus.png";

const Sidebar = () => {
  return (
    <div className="max-w-[300px] border-r-2 border-gray-200 h-screen p-6">
      <button className="bg-white rounded-full h-14 w-40 shadow-lg flex  items-center justify-center">
        <img src={Plus} alt="" className="h-8 w-8 mr-4" />
        <span className="text-lg font-semibold">New</span>
      </button>
    </div>
  );
};

export default Sidebar;
