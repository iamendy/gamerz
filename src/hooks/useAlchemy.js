import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import config from "../config";
import alchemy from "../lib/alchemy";
import { ethers } from "ethers";
const useAlchemy = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [NFTs, setNFTs] = useState([]);
  const [tokenBalance, setTokenBalance] = useState("");

  useEffect(() => {
    (async () => {
      const token = await alchemy.core.getTokenBalances(address, [
        config.token.address,
      ]);
      const nft = await alchemy.nft.getNftsForOwner(`${address}`);

      setTokenBalance(
        ethers.utils.formatEther(token?.tokenBalances[0].tokenBalance)
      );
      setNFTs(
        nft?.ownedNfts?.filter(
          (n) =>
            n.contract.address.toLocaleLowerCase() ===
            config.nft.address.toLocaleLowerCase()
        )
      );

      setIsLoading(false);
    })();
  }, []);

  return { NFTs, tokenBalance, isLoading };
};

export default useAlchemy;
