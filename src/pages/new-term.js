import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import NewTermModal from "../components/NewTermModal";
import NewTermProvider from "../contexts/NewTermContext";
import NewTermForm from "../components/NewTermForm";
import { useAccount } from "wagmi";
import useAlchemy from "../hooks/useAlchemy";
import Loader from "../components/Loader";

const NewTerm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (st) => setIsOpen(st);
  const { tokenBalance, NFTs, isLoading } = useAlchemy();

  //get amount of tokens && NFT
  NFTs && console.log(NFTs);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : tokenBalance > 0 && NFTs.length > 0 ? (
        <NewTermProvider>
          <div className="relative">
            <NewTermModal isOpen={isOpen} toggle={toggle} />

            <NewTermForm toggle={toggle} />
          </div>
        </NewTermProvider>
      ) : (
        <p> Not Eligible</p>
      )}
    </Layout>
  );
};
export default NewTerm;
