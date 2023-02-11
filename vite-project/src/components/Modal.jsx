import React, { useState, useContext } from "react";
import { AppContext } from "../context/context";
import axios from "axios";
import Close from "../assets/close.png";

const Modal = ({ openModal }) => {
  const { currentAccount, addFile } = useContext(AppContext);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgUrl) {
      try {
        const formData = new FormData();
        formData.append("file", imgUrl);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Your Api Key`,
            pinata_secret_api_key: `Your Secrete Key`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        await addFile(name, ImgHash);
        
        alert(`Here's your image: ipfs://${resFile.data.IpfsHash}`)
      } catch (error) {
        console.log(error);
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; 
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setImgUrl(e.target.files[0]);
    };
    e.preventDefault();
  };
  return (
    <div className="border shadow-md bg-white rounded-xl z-10 absolute top-0 left-0  p-3 h-[350px] w-[300px]">
      <img
        src={Close}
        alt=""
        onClick={() => openModal(false)}
        className="h-6 w-6 cursor-pointer absolute top-2 right-2"
      />
      <form className="mt-8 flex flex-col space-y-5" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className=" text-lg font-medium ">
          Choose File
        </label>
        <input
          type="file"
          disabled={!currentAccount}
          id="file-upload"
          name="data"
          onChange={retrieveFile}
          className=""
        />
        {/* <span className="">#temp.png</span> */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 outline-none"
        />
        <button className="border bg-gray-100 p-3 " type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Modal;
