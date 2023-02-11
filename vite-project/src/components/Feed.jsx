import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import Card from "./Card";

const Feed = () => {
  const [address, setAddress] = useState("");
  const { currentAccount, getData, data } = useContext(AppContext);

  const getAllData = async () => {
    try {
      let dataArray;
      if (address) {
        dataArray = await getData(address);
      } else {
        dataArray = await getData(currentAccount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl text-gray-600 border-b p-1">My Files</h2>
      <div className="mt-4 w-full flex  items-center justify-center">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
          className="address border text-gray-600 p-2 outline-none w-[300px]"
        ></input>
        <button
          className="px-4 py-2  bg-blue-700 text-white"
          onClick={() => getAllData()}
        >
          Get Data
        </button>
      </div>

      {/* All Files */}
      {data ? (
        <div className="mt-10 flex flex-wrap justify-between">
          {data.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Feed;
