import ListTerm from "./ListTerm";
import { useContractRead, useAccount } from "wagmi";
import config from "../config/index";
import Loader from "./Loader";
import Link from "next/link";

const ListedTermsWrapper = () => {
  const { address } = useAccount();
  const { data: terms, isFetching } = useContractRead({
    address: config.contract.address,
    abi: config.contract.abi,
    from: address,
    watch: true,
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
          listTerms.map((term, i) => <ListTerm key={i} term={term} />)
        ) : (
          <div>
            <h1 className="mb-3">Oops! You do not have any listing.</h1>
            <Link
              className="bg-indigo-700 px-5 py-2 inline-block "
              href="/new-term"
            >
              Create One
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default ListedTermsWrapper;
