import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default alchemy;
// The wallet address / token we want to query for:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
const balances = await alchemy.core.getTokenBalances(ownerAddr, [
  "0x607f4c5bb672230e8672085532f7e901544a7375",
]);

// The token address we want to query for metadata:
const metadata = await alchemy.core.getTokenMetadata(
  "0x607f4c5bb672230e8672085532f7e901544a7375"
);

console.log("Token Balances:");
console.log(balances);
console.log("Token Metadata: ");
console.log(metadata);
