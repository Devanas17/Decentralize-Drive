import React, { useContext } from "react";
import DriveLogo from "../assets/drive-logo.png";
import SearchIcon from "../assets/search.png";
import { AppContext } from "../context/context";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(AppContext);
  return (
    <div className="w-full px-6 md:px-10 h-20 bg-white shadow-sm flex items-center justify-between space-x-4 md:space-x-36">
      <div className="h-14 w-14 flex space-x-2 items-center">
        <img src={DriveLogo} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex-grow flex items-center  bg-gray-100 w-full  shadow-md active:border-gray-200 rounded-md">
        <img src={SearchIcon} alt="" className="h-4 w-4 ml-3 " />
        <input
          type="text"
          className="w-full h-11  border-none outline-none px-3 bg-gray-100"
          placeholder="Search Your File..."
        />
      </div>
      <div className="">
        {!currentAccount ? (
          <button className="bg-blue-700 text-white shadow-md rounded-lg text-xs h-11 w-32 flex items-center justify-center border-gray-100" onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        ) : (
          <button className="bg-blue-700 text-white shadow-md rounded-lg text-xs h-11 w-32 flex items-center justify-center border-gray-100">
            {currentAccount.slice(0,7)}...
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
