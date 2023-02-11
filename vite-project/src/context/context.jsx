import { useState, useEffect, createContext } from "react";

import {
  connectWallet,
  connectWithContract,
  checkIfWalletConnected
} from "../utils/apiFeature";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accessLists, setAccessLists] = useState([]);
  const [data, setData] = useState()
 


  const fetchData = async () => {
    try {
      const contract = await connectWithContract();
      const connectAccount = await connectWallet();
      setCurrentAccount(connectAccount);
      const accessLists = await contract.getAccessList();
      setAccessLists(accessLists);
   
    } catch (error) {
      console.log(error)
    }
  };



  const addFile = async ( name, imgUrl) => {
    try {
      const contract = await connectWithContract();
      const add = await contract.addMedia(name, imgUrl, {gasLimit: 5000000});
      await add.wait();
    } catch (error) {
      console.log("something went wrong in Add File.", error);
    }
  };

  const getData = async(userAddress) =>{
    try {
      const contract = await connectWithContract()
      const get = await contract.display(userAddress)
      setData(get)
    } catch (error) {
      console.log("Get Data", error)
    }
  }

  useEffect(() => {
    checkIfWalletConnected()
  }, [])



  useEffect(() => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    checkIfWalletConnected()
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentAccount,
        accessLists,
        data,
        connectWallet,
        addFile,
        getData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};