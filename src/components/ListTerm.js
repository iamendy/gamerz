import truncateEthAddress from "truncate-eth-address";
import UserIcon from "./icons/UserIcon";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import config from "../config";
import { useCountdown } from "../hooks/useCountdown";

const ActiveTerm = ({ term }) => {
  const { address } = useAccount();
  const { days, hours, minutes, seconds, isCountdownCompleted } = useCountdown(
    parseInt(term.duration) + parseInt(term.timeAccepted)
  );

  const { isFetching, isError, error } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "cancelRequirement",
    args: [term.termId],
  });

  return (
    <div className="relative p-3 rounded-md border-2 cursor-pointer hover:border-indigo-700 border-indigo-800 group hover:shadow hover:bg-indigo-600">
      {term.reqStatus == 2 && (
        <div className="absolute w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">paired with</span>
        </div>
      )}

      {term.reqStatus == 3 && (
        <div className="absolute w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">settled</span>
        </div>
      )}

      {term.reqStatus == 0 && (
        <div className="absolute w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">Awaiting</span>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <UserIcon />

        <span>{truncateEthAddress(term.proGamer)}</span>
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

        <div className="flex mt-4 text-black dark:text-white">
          {isCountdownCompleted && term.reqStatus == 3 ? (
            <button className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black">
              Settle
            </button>
          ) : term.reqStatus == 0 ? (
            <button className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black">
              Cancel
            </button>
          ) : (
            <div className="flex space-x-2">
              Ends in: <p> {days + ":" + hours + ":" + minutes + ""}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ActiveTerm;
