import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

export default alchemy;
