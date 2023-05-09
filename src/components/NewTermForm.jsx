import { useContext, useEffect } from "react";
import { NewTermContext } from "../contexts/NewTermContext";
import { ethers } from "ethers";

const NewTermForm = ({ toggle, nfts, tokenBalance }) => {
  const { term, hasFilledForm, updateTerm, nextStep, captureNFT } =
    useContext(NewTermContext);

  return (
    <div className="wrapper">
      <div className="max-w-4xl lg:mx-auto">
        <h2 className="text-xl mt-5">Create a new Term</h2>
        <div className="mt-6">
          <div className="flex space-x-5">
            <p className="mb-3 text-sm">Current ELO: 2300</p>
            <p className="mb-3 text-sm">
              Current Balance: {ethers.utils.formatEther(`${tokenBalance}`)}
            </p>
          </div>

          <div className="flex space-x-5 items-center my-5">
            {nfts?.map((nft, i) => (
              <div
                onClick={() => captureNFT(nft)}
                key={i}
                className={`px-5 py-3 ${
                  term.selectedTokenId == nft.tokenId
                    ? "bg-indigo-400"
                    : "bg-gray-700"
                } rounded-lg cursor-pointer`}
              >
                {nft.contract.name} #{nft.tokenId}
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="text"
              placeholder="Duration"
              name="duration"
              onChange={(e) => updateTerm(e)}
            />

            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="text"
              placeholder="Price per ELO"
              name="pricePerElo"
              onChange={(e) => updateTerm(e)}
            />

            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="text"
              placeholder="Max Renumeration"
              name="maxRenumeration"
              onChange={(e) => updateTerm(e)}
            />

            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white dark:bg-slate-800 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="text"
              placeholder="Pro Gamer's stake"
              name="proGamerStake"
              onChange={(e) => updateTerm(e)}
            />

            <button
              className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-800 disabled:bg-gray-500"
              disabled={!hasFilledForm}
              onClick={() => {
                nextStep();
                toggle(true);
              }}
            >
              Create Listing
            </button>
          </div>

          <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0"></div>
        </div>
      </div>
    </div>
  );
};
export default NewTermForm;
