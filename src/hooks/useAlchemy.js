import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import config from "../config";
import alchemy from "../lib/alchemy";
import { NewTermContext } from "../contexts/NewTermContext";

const useAlchemy = () => {
  const [NFTs, setNFTs] = useState([]);
  const [tokenBalance, setTokenBalance] = useState("");
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const getStats = async () => {};
  useEffect(() => {
    (async () => {
      //setIsLoading(true);
      const token = await alchemy.core.getTokenBalances(address, [
        config.token.address,
      ]);
      const nft = await alchemy.nft.getNftsForOwner(`${address}`);

      setTokenBalance(parseInt(token.tokenBalances[0].tokenBalance));
      setNFTs(nft.ownedNfts);
      setIsLoading(false);
    })();
  }, []);

  return { NFTs, tokenBalance, isLoading };
};

export default useAlchemy;
