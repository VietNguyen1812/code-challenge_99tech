// import WalletConnectButton from "@/components/walletConnectButton";
"use client";
import { useEffect } from "react";
import SwapForm from "@/components/swapForm";
import { useSwapStore } from "@/store/useSwapStore";
import { fetchTokens } from "@/utils/fetchTokens";

export default function Home() {
  const setTokens = useSwapStore((state) => state.setTokens);

  useEffect(() => {
    const loadTokens = async () => {
      const tokens = await fetchTokens();
      console.log("Fetched tokens:", tokens);
      setTokens(tokens);
    };
    loadTokens();
  }, [setTokens]);
  return (
    <div>
      <SwapForm />
    </div>
  );
}
