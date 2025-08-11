import { WalletStore } from "@/store";
import axios from "axios";

export const showBalance = async (address: any, modal: boolean) => {
  const setBalance = WalletStore.getState().setBalance;
    const alchemyUrl = "https://solana-devnet.g.alchemy.com/v2/T0CLMnl7EO65B9mGepnkXrj8I-uhKFdy";
    try {
      const response = await axios.post(
        alchemyUrl,
        {
          id: 1,
          jsonrpc: "2.0",
          method: "getBalance",
          params: [address]
        },
        {
            headers: { "Content-type": "application/json" }
        }
      )
      const balance = response.data?.result?.value;
      console.log(`Balance of ${address}:`, balance);
      if(modal === false) {
        setBalance(balance)
      }else{
        return balance;
      }
    } catch (error) {
      console.error(error);
    }
}