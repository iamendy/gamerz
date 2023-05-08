import ActiveTerm from "./ActiveTerm";
import { useContractRead, useAccount } from "wagmi";
import config from "../config/index";
import Loader from "../components/Loader";

const ActiveTermsWrapper = () => {
  const { address } = useAccount();
  const { data: terms, isFetching } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "getTerms",
  });
  terms && console.log(terms);
  return (
    <>
      <h3 className="mb-4 font-bold">The Terms you accept show up here</h3>
      <div className="active flex space-x-4">
        {isFetching ? (
          <Loader />
        ) : terms && terms.length > 0 ? (
          terms
            .filter((term) => term.proGamer == address)
            .map((term, i) => <ActiveTerm key={i} term={term} />)
        ) : (
          <p>Nothing found</p>
        )}
      </div>
    </>
  );
};
export default ActiveTermsWrapper;
