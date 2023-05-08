import { useState } from "react";
import AcceptModal from "./AcceptTermsModal/AcceptModal";
import Term from "../components/Term";
import AcceptTermProvider from "../contexts/AcceptTermContext";
import { useContractRead, useAccount } from "wagmi";
import config from "../config";
import Loader from "../components/Loader";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Gamers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const toggle = (st) => {
    document.body.style.overflowY = isOpen ? "scroll" : "hidden";
    setIsOpen(st);
  };

  const {
    data: terms,
    isFetching,
    isSuccess,
    isError,
  } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "getTerms",
  });

  return (
    <AcceptTermProvider>
      <section className="relative py-10 sm:py-16 lg:py-24">
        {/* When a Term is selected, it updatesSelection an toggle modal */}
        <AcceptModal isOpen={isOpen} toggle={toggle} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
              Choose your adventure!
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-200">
              Train listed AIs and earn $NRN tokens
            </p>
          </div>

          {isFetching ? (
            <div className="flex flex-col items-center justify-center">
              <Loader /> Fetching Terms..
            </div>
          ) : terms && terms.length > 0 ? (
            <div className="mx-auto mt-8 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 md:max-w-5xl md:gap-8">
              {terms
                .filter((term) => term.reqStatus == 0)
                .map((term, i) => (
                  <Term toggle={toggle} key={i} term={term} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <h3>Oops! No Terms found</h3>

              {address ? (
                <Link
                  className="inline-block bg-indigo-500 py-3 mt-2 px-5"
                  href="/new-term"
                >
                  Create yours
                </Link>
              ) : (
                <div>
                  <ConnectButton />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </AcceptTermProvider>
  );
};

export default Gamers;
