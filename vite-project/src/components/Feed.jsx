import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import Card from "./Card";
import Share from "./Share";
import Loader from "./Loader";
import loader  from "../assets/loader.svg";

const Feed = () => {
  const [address, setAddress] = useState("");
  const { currentAccount, getData, data, shareAccess,  getAccessList, accessLists } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const getAllData = async () => {
    try {
      let dataArray;
      if (address) {
        setLoading(true)
        dataArray = await getData(address);
        setLoading(false)
      } else {
        setLoading(true)
        dataArray = await getData(currentAccount);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-4">
      <div className="border-b p-1 flex items-center justify-between">
      <h2 className="text-2xl text-gray-600 ">My Files</h2>
      <button className="border border-blue-700 px-5 py-1 text-blue-700 rounded-md" onClick={() => setOpenModal(true)}>Share</button>
      </div>
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

      {openModal && <Share openModal={setOpenModal} share={shareAccess} access={ getAccessList} accessLists={accessLists}/>}

      <div className="w-full flex items-center justify-center">
        {loading ? (
          <img src={loader} alt="loader" className=" h-14 w-14" />
        ): ""}
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
