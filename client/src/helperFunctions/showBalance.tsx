import axios from "axios";

export const showBalance = async (address: any) => {
    const alchemyUrl = "https://solana-mainnet.g.alchemy.com/v2/T0CLMnl7EO65B9mGepnkXrj8I-uhKFdy";
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
    } catch (error) {
      console.error(error);
    }
}