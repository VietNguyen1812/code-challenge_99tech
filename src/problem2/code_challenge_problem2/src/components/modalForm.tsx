"use client";

import { useState } from "react";
import { useSwapStore } from "@/store/useSwapStore";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Search, MoreVertical } from "lucide-react";

interface Token {
  symbol: string;
  price?: number;
  icon: string;
}

interface TokenSelectorDialogProps {
  isFromToken: boolean;
  selectedToken: Token | null;
}

export default function TokenSelectorDialog({
  isFromToken,
  selectedToken,
}: TokenSelectorDialogProps) {
  const { tokens, setFromToken, setToToken } = useSwapStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Lọc token theo tìm kiếm
  const filteredTokens = tokens.filter((token) =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectToken = (token: Token) => {
    if (isFromToken) {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    // Không đóng dialog sau khi chọn (đóng bằng nút Confirm)
  };

  const handleConfirm = () => {
    setOpen(false); // Đóng dialog khi nhấn Confirm
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#2a2a3a] border-gray-700 text-white hover:bg-[#333345] rounded-lg whitespace-nowrap"
        >
          {selectedToken ? (
            <div className="flex items-center">
              <img
                src={selectedToken.icon}
                alt={selectedToken.symbol}
                className="w-5 h-5 mr-2 rounded-full"
                onError={(e) => (e.currentTarget.src = "/fallback-icon.svg")}
              />
              <span>{selectedToken.symbol}</span>
              <ChevronDown className="ml-2 w-4 h-4" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Select Token</span>
              <ChevronDown className="ml-2 w-4 h-4" />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#2a2a3a] text-white border-gray-700 sm:max-w-[425px]">
        <DialogTitle className="flex items-center text-lg font-medium">
          <button
            className="mr-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span>Token List</span>
          <div className="ml-auto">
            <button className="text-gray-400 hover:text-white cursor-pointer"></button>
          </div>
        </DialogTitle>
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search name or paste address"
              className="bg-[#222232] border-gray-700 text-white placeholder:text-gray-400 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filteredTokens.slice(0, 3).map((token) => (
              <div
                key={token.symbol}
                className={`flex flex-col items-center bg-[#222232] p-3 rounded-lg cursor-pointer hover:bg-[#333345] ${
                  selectedToken && selectedToken.symbol === token.symbol
                    ? "bg-gradient-to-r from-sky-400 to-green-600 text-white"
                    : ""
                }`}
                onClick={() => handleSelectToken(token)}
              >
                <img
                  src={token.icon}
                  alt={token.symbol}
                  className="w-10 h-10 rounded-full mb-2"
                  onError={(e) => (e.currentTarget.src = "/fallback-icon.svg")}
                />
                <span className="text-sm">{token.symbol}</span>
              </div>
            ))}
          </div>
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {filteredTokens.map((token) => (
                <div
                  key={token.symbol}
                  className={`flex items-center justify-between p-3 hover:bg-[#333345] cursor-pointer rounded-lg ${
                    selectedToken && selectedToken.symbol === token.symbol
                      ? "bg-gradient-to-r from-sky-400 to-green-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleSelectToken(token)}
                >
                  <div className="flex items-center">
                    <img
                      src={token.icon}
                      alt={token.symbol}
                      className="w-8 h-8 rounded-full mr-3"
                      onError={(e) =>
                        (e.currentTarget.src = "/fallback-icon.svg")
                      }
                    />
                    <div>
                      <div>{token.symbol}</div>
                      <div className="text-sm text-gray-400">
                        {token.symbol}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button
              className="bg-green-400 hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
