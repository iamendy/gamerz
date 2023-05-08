import ActiveTerm from "./ActiveTerm";
import { useContractRead, useAccount } from "wagmi";
import config from "../config/index";
import Loader from "./Loader";

const ListedTermsWrapper = () => {
  const { address } = useAccount();
  const { data: terms, isFetching } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "getTerms",
  });
  const listTerms = terms?.filter((term) => term.casualGamer == address);
  return (
    <>
      <h3 className="mb-4 font-bold">The Terms you created shows up here</h3>
      <div className="active flex space-x-4">
        {isFetching ? (
          <Loader />
        ) : listTerms?.length > 0 ? (
          listTerms.map((term, i) => <ActiveTerm key={i} term={term} />)
        ) : (
          <p className="text-white">You have not created any Term</p>
        )}
      </div>
    </>
  );
};
export default ListedTermsWrapper;
