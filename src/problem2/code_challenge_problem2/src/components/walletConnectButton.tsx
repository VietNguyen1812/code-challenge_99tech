"use client";
import Web3 from "web3";
import { useSwapStore } from "@/store/useSwapStore";
import { Button } from "./ui/button";
import { useEffect } from "react";

const WalletConnectButton = () => {
  const { walletAddress, isConnected, setWalletAddress, setIsConnected } =
    useSwapStore();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (err) {
        console.error("Connect Fail", err);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet extension.");
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
        }
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [setWalletAddress, setIsConnected]);

  return (
    <Button
      variant="outline"
      className="bg-green-400 hover:bg-green-500 
      text-black
      font-medium px-4 py-2 
      !rounded-button cursor-pointer whitespace-nowrap"
      onClick={connectWallet}
    >
      {isConnected && walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
