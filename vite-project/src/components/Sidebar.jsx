import React, { useState } from "react";
import Plus from "../assets/plus.png";
import Modal from "./Modal";

const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-[300px] border-r border-gray-200 h-screen p-6">
      <button
        className="bg-white rounded-full h-14 w-40 shadow-lg flex  items-center justify-center"
        onClick={() => setOpenModal(true)}
      >
        <img src={Plus} alt="" className="h-8 w-8 mr-4" />
        <span className="text-lg font-semibold hidden sm:inline-flex">New</span>
      </button>

      {/* Modal Component */}
      {openModal && (
        <div className="">
          <Modal
            openModal={setOpenModal}
            title="Welcome"
            head="Chat Buddy"
            heading="You can get everything in life you want if you will just help enough other people get what they want."
            subHeading="Kindly select your name"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
