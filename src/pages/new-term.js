import Layout from "../components/Layout";
import { useState } from "react";
import NewTermModal from "../components/NewTermModal";
import NewTermProvider from "../contexts/NewTermContext";
import NewTermForm from "../components/NewTermForm";
import useAlchemy from "../hooks/useAlchemy";
import Loader from "../components/Loader";
import { ethers } from "ethers";
import Link from "next/link";

const NewTerm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (st) => setIsOpen(st);
  const { tokenBalance, NFTs, isLoading } = useAlchemy();

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : tokenBalance > 0 && NFTs.length > 0 ? (
        <NewTermProvider>
          <div className="relative">
            <NewTermModal isOpen={isOpen} toggle={toggle} />

            <NewTermForm
              toggle={toggle}
              nfts={NFTs}
              tokenBalance={tokenBalance}
            />
          </div>
        </NewTermProvider>
      ) : (
        <div className="min-h-1/2 flex flex-col items-center justify-center p-10">
          <p>
            Your token balance is: {tokenBalance}
            NRN
          </p>
          <p>Not Eligible. You need an NFT to create a listing.</p>

          <div className="bg-indigo-500 px-5 py-3 rounded-md mt-5 hover:bg-indigo-700">
            <Link href="/">View Marketplace</Link>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default NewTerm;
