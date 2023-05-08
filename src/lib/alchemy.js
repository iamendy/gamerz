import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "W8mozDNOLkCr78f9GEO9nP2_wVzaS7wq",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

export default alchemy;
