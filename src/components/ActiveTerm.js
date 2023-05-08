import truncateEthAddress from "truncate-eth-address";
import UserIcon from "../components/icons/UserIcon";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../config";
const ActiveTerm = ({ term }) => {
  const { isFetching, isError, error } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "settleTerms",
    args: [term.termId - 1],
  });
  return (
    <div className="relative p-3 rounded-md border-2 cursor-pointer hover:border-indigo-700 border-indigo-800 group hover:shadow hover:bg-indigo-600">
      {term.reqStatus == 2 && (
        <div className="absolute w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">paired</span>
        </div>
      )}

      {term.reqStatus == 3 && (
        <div className="absolute w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">settled</span>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <UserIcon />

        <span>{truncateEthAddress(term.casualGamer)}</span>
      </div>
      <div className="mt-3">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-200">
          Current Score: {term.currentEloScore.toString()} ELO
        </p>
        <p className="mt-4 text-black dark:text-white">
          Price Per ELO: {term.pricePerElo.toString()} NRN
        </p>

        <p className="mt-4 text-black dark:text-white">
          Stake: {term.proGamersStake.toString()} NRN
        </p>

        <p className="mt-4 text-black dark:text-white">
          Duration: {term.duration.toString() / 60} mins
        </p>

        {term.reqStatus == 2 && (
          <button className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black">
            Settle
          </button>
        )}
      </div>
    </div>
  );
};
export default ActiveTerm;
