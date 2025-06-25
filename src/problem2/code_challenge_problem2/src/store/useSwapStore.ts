import { create } from 'zustand'

interface Token {
    symbol: string; // name Token
    price?: number; // price from Token
    icon: string; // Url Img from token
}

interface SwapState {
    fromToken: Token | null   // Token which users want send 
    toToken: Token | null   // Token which users want  receive
    fromAmount: string;  // Quantity Token send
    toAmount: string    // Quantity Token receive
    tokens: Token[]  // List token
    walletAddress: string | null   // Metamask address
    isConnected: boolean
    setFromToken: (token: Token) => void;
    setToToken: (token: Token) => void;
    setFromAmount: (amount: string) => void;
    setToAmount: (amount: string) => void;
    setTokens: (token: Token[]) => void;
    setWalletAddress: (address: string | null) => void;
    setIsConnected: (isConnected: boolean) => void;
    swapTokens: () => void;

}

export const useSwapStore = create<SwapState>((set) => ({
    fromToken: null,
    toToken: null,
    fromAmount: '',
    toAmount: '',
    tokens: [],
    walletAddress: null,
    isConnected: false,
    setFromToken: (token) => set({ fromToken: token }),
    setToToken: (token) => set({ toToken: token }),
    setFromAmount: (amount) => set({ fromAmount: amount }),
    setToAmount: (amount) => set({ toAmount: amount }),
    setTokens: (tokens) => set({ tokens }),
    setWalletAddress: (address) => set({ walletAddress: address }),
    setIsConnected: (isConnected) => set({ isConnected }),
    swapTokens: () =>
        set((state) => ({
            fromToken: state.toToken,
            toToken: state.fromToken,
            fromAmount: state.toAmount,
            toAmount: state.fromAmount,
        })),
}));