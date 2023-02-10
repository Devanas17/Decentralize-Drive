import { contractAddress, contractABI } from "./contant";
import { ethers } from "ethers";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return alert("Please Install Metamask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Check If Wallet Connected:", error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please Install Metamask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Connect Wallet", error);
  }
};

export const connectWithContract = async () => {
  try {
    const {ethereum} = window
    const provider = new ethers.providers.Web3Provider(ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,   
      signer
    );
    return contract
  } catch (error) {
    console.log("Connect With Contract", error);
  }
};

