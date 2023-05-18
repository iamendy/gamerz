import truncateEthAddress from "truncate-eth-address";
import UserIcon from "./icons/UserIcon";
import { useCountdown } from "../hooks/useCountdown";
import CancelListButton from "./CancelListButton";
import SettleButton from "./SettleButton";

const ActiveTerm = ({ term }) => {
  const { days, hours, minutes, seconds, isCountdownCompleted } = useCountdown(
    parseInt(term.duration) + parseInt(term.timeAccepted)
  );

  return (
    <div className="relative p-3 pt-10 rounded-md border-2 cursor-pointer hover:border-indigo-700 border-indigo-800 group hover:shadow hover:bg-indigo-600">
      {term.reqStatus == 2 && (
        <div className="absolute p-4 w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">paired with</span>
        </div>
      )}

      {term.reqStatus == 3 && (
        <div className="absolute p-4 w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">settled</span>
        </div>
      )}

      {term.reqStatus == 0 && (
        <div className="absolute p-4 w-full h-[12px] top-0 left-0 bg-indigo-500 rounded-md flex justify-center items-center">
          <span className="text-xs">Awaiting</span>
        </div>
      )}

      {term.reqStatus == 1 && (
        <div className="absolute p-4 w-full h-[12px] top-0 left-0 bg-red-500 rounded-md flex justify-center items-center">
          <span className="text-xs">Cancelled</span>
        </div>
      )}

      {term.reqStatus == 4 && (
        <div className="absolute p-4 w-full h-[12px] top-0 left-0 bg-green-700 rounded-md flex justify-center items-center">
          <span className="text-xs">Completed</span>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <UserIcon />

        <span>{truncateEthAddress(term.proGamer)}</span>
      </div>
      <div className="mt-3">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-200">
          Starting Score: {term.currentEloScore.toString()} ELO
        </p>

        <p className="mt-4 text-black dark:text-white">
          Price Per ELO: {term.pricePerElo.toString()} NRN
        </p>

        <p className="mt-4 text-black dark:text-white">
          ProGamer Stake: {term.proGamersStake.toString()} NRN
        </p>

        <p className="mt-4 text-black dark:text-white">
          Final ELO:
          {term.reqStatus == 3 || term.reqStatus == 4
            ? term.endingEloScore.toString() + " ELO"
            : " Ongoing"}
        </p>

        <div className="flex mt-4 text-black dark:text-white">
          {isCountdownCompleted && term.reqStatus == 4 ? (
            <SettleButton term={term} />
          ) : term.reqStatus == 0 ? (
            <CancelListButton term={term} />
          ) : term.reqStatus == 1 ? (
            <>cancelled</>
          ) : !isCountdownCompleted && term.reqStatus == 2 ? (
            <div className="flex space-x-2">
              Ends in:
              <p> {days + ":" + hours + ":" + minutes + ":" + seconds}</p>
            </div>
          ) : isCountdownCompleted && term.reqStatus == 2 ? (
            <div className="flex space-x-2">Processing Final ELO</div>
          ) : (
            <button className="mt-2 inline-flex items-center justify-center rounded-md px-10 py-4 font-semibold text-white bg-gray-500">
              Settled
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ActiveTerm;
