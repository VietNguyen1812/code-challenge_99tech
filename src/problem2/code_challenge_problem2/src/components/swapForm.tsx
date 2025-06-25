"use client";

import { useState, useEffect } from "react";
import { useSwapStore } from "@/store/useSwapStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Star, Settings, Clipboard } from "lucide-react";
import TokenSelectorDialog from "./modalForm";
import Web3 from "web3";

export default function SwapForm() {
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    setFromAmount,
    setToAmount,
    swapTokens,
    isConnected,
  } = useSwapStore();
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const fromValue = parseFloat(fromAmount) * (fromToken.price || 1);
      const toValue = fromValue / (toToken.price || 1);
      if (!isNaN(toValue)) {
        setToAmount(toValue.toFixed(6));
      } else {
        setToAmount("");
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken, setToAmount]);

  const handleFromAmountChange = (value: string) => {
    const rawValue = value.replace(/[^0-9]/g, "");

    if (!rawValue) {
      setError("");
      setFromAmount("");
      return;
    }

    if (parseInt(rawValue) < 0) {
      setError("Amount cannot be negative");
      return;
    }

    const formattedValue = new Intl.NumberFormat("en-US").format(
      parseInt(rawValue)
    );

    setError("");
    setFromAmount(formattedValue);
  };

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const handleSwap = async () => {
    if (
      !web3 ||
      !fromToken ||
      !toToken ||
      !fromAmount ||
      !!error ||
      !isConnected
    )
      return;

    const contractAddress = "0xYourSwapContractAddress";
    const abi = [
      {
        inputs: [
          { name: "fromToken", type: "address" },
          { name: "toToken", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        name: "swap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    try {
      await contract.methods
        .swap(
          fromToken.symbol,
          toToken.symbol,
          web3.utils.toWei(fromAmount, "ether")
        )
        .send({ from: accounts[0] });
      console.log("Swap successful!");
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-[#2a2a3a] border-none shadow-xl py-1">
          <CardHeader className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent hover:from-green-500 hover:to-emerald-700 transition-all duration-300">
                Swap
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white cursor-pointer">
                <Star className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {/* From Token */}
            <div className="relative">
              <div className="flex items-center justify-between bg-[#222232] rounded-lg p-3">
                <TokenSelectorDialog
                  isFromToken={true}
                  selectedToken={fromToken}
                />
                <Input
                  className="bg-transparent border-none text-right focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 
             text-xl font-semibold text-white 
             focus:border-b-2 focus:border-blue-500 
             py-2 px-4 transition-all duration-200"
                  placeholder="Enter an Amount"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                />
              </div>
            </div>
            {/* Swap Direction Button */}
            <div className="flex justify-center">
              <div
                className="bg-[#2a2a3a] border border-gray-700 rounded-full p-1 cursor-pointer"
                onClick={swapTokens}
              >
                <ArrowDownUp className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {/* To Token */}
            <div className="relative">
              <div className="flex items-center justify-between bg-[#222232] rounded-lg p-3">
                <TokenSelectorDialog
                  isFromToken={false}
                  selectedToken={toToken}
                />
                <Input
                  className="bg-transparent border-none text-right focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 
             text-xl font-semibold text-white 
             focus:border-b-2 focus:border-blue-500 
             py-2 px-4 transition-all duration-200"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                />
              </div>
            </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Swap Button */}
            <div className="space-y-2">
              <Button
                className="w-full bg-green-400 hover:bg-green-500 text-black font-medium py-5 rounded-lg"
                disabled={!fromToken || !toToken || !fromAmount || !!error}
                onClick={handleSwap}
              >
                {isConnected ? "Swap" : "Connect Wallet"}
              </Button>
            </div>
            {/* Additional Info */}
            <div className="flex justify-between text-xs text-gray-400">
              <span>Estimated Gas: $0.00</span>
              <button className="hover:text-white cursor-pointer">
                <Clipboard className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
