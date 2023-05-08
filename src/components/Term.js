import UserIcon from "../components/icons/UserIcon";
import { useContext } from "react";
import { AcceptTermContext } from "../contexts/AcceptTermContext";
import truncateEthAddress from "truncate-eth-address";
const Term = ({ toggle, term }) => {
  const { nextStep, updateSelectedTerm } = useContext(AcceptTermContext);

  return (
    <div className=" rounded-md border-2 cursor-pointer hover:border-indigo-700 border-indigo-800 group hover:shadow hover:bg-indigo-600">
      <div className="px-4 py-5 lg:p-8 space-y-3">
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
        </div>
        <div>
          <a
            href="#"
            title=""
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black"
            role="button"
            onClick={() => {
              toggle(true);
              updateSelectedTerm(term);
              nextStep();
            }}
          >
            Accept
          </a>
        </div>
      </div>
    </div>
  );
};
export default Term;
