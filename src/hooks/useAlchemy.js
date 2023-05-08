import { useState } from "react";
import alchemy from "../lib/alchemy";

const useAlchemy = () => {
  const [NFTs, setNFTs] = useState([]);
  const [tokenBalance, setTokenBalance] = useState("");

  return { NFTs, tokenBalance };
};
export default useAlchemy;
