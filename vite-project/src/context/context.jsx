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
 


  const fetchData = async () => {
    try {
      const contract = await connectWithContract();
      const connectAccount = await connectWallet();
      setCurrentAccount(connectAccount);
    
      const accessLists = await contract.getAccessList();
      console.log("The Access LIst", accessLists)
      setAccessLists(accessLists);
   
    } catch (error) {
      console.log(error)
    }
  };



  const addFile = async ( name, imgUrl) => {
    try {
      const contract = await connectWithContract();
      console.log("Contract", contract)
      const add = await contract.addMedia(name, imgUrl, {gasLimit: 5000000});
      await add.wait();
      // window.location.reload();
    } catch (error) {
      console.log("something went wrong in Add File.", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentAccount,
        accessLists,
        connectWallet,
        addFile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};