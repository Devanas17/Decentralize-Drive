import React, { useState, useEffect } from "react";
import Close from "../assets/close.png";

const Share = ({ openModal, share, access, accessLists }) => {
  const [address, setAddress] = useState("");

  const shareFile = async () => {
    try {

      await share(address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getLists = async () => {
      const list = await access();
    };
    getLists();
  }, []);
  const m = [1, 2];
  return (
    <div className="border absolute top-0 right-0 p-4 bg-white">
      <img
        src={Close}
        alt="close-icon"
        className="h-4 w-4 cursor-pointer"
        onClick={() => openModal(false)}
      />
      <div className="mt-4 space-y-3">
        <h1 className="text-xl text-gray-700 font-bold">
          Share File with Friends
        </h1>
        <div className="">
          <h3 className="text-sm text-gray-500 font-bold">Address:</h3>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="User Address"
            className="border outline-none w-full bg-white text-gray-600 rounded-sm p-1"
          />
          <div className="">
            <button
              className="mt-5 bg-blue-700 text-white border border-blue-700 transition ease-out duration-250 px-4 py-1 text-xs  hover:bg-white hover:text-blue-700"
              onClick={() => shareFile()}
            >
              Share
            </button>
          </div>
        </div>

        <div className="space-y-2 ">
        <h2 className="text-lg text-gray-700 font-semibold">Shared Account:</h2>
          {accessLists.map((item, i) => (
            <div className="flex items-center space-x-3" key={i}>
              <span className=" text-xs h-5 w-5 border rounded-full flex items-center justify-center border-gray-600 text-gray-600">{i+1}</span>
              <h3 className="text-xs text-gray-600">{item?.user}</h3>
              <span className="text-sm text-blue-500">
                {(item?.access).toString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Share;
