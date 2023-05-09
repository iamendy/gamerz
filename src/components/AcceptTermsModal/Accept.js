import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import config from "../../config";
import { useContext, useEffect } from "react";
import { AcceptTermContext } from "../../contexts/AcceptTermContext";
import Loader from "../Loader";

const Accept = () => {
  const { address } = useAccount();
  const { term, nextStep } = useContext(AcceptTermContext);

  const {
    config: acceptConfig,
    isError: isAcceptError,
    error: acceptError,
    isFetching: isFetchingAccept,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "acceptRequirements",
    from: address,
    args: [parseInt(term.termId)],
  });

  const {
    data: acceptData,
    write: accept,
    isLoading: isWritingAccept,
  } = useContractWrite(acceptConfig);

  const { isSuccess: isSuccessAccept, isLoading: isLoadingAcceptTx } =
    useWaitForTransaction({
      hash: acceptData?.hash,
      confirmations: 1,
    });

  useEffect(() => {
    if (isSuccessAccept == true) {
      //Router.push("/profile");
      nextStep();
    }
  }, [isSuccessAccept]);

  return (
    <div className="flex flex-col space-y-3 text-center">
      {isAcceptError && <p className="text-red-500"> {acceptError?.reason} </p>}

      <p>Great! Now you can stake</p>
      {(isLoadingAcceptTx || isWritingAccept || isFetchingAccept) && <Loader />}
      <button
        className="bg-indigo-600 p-2 rounded-sm disabled:bg-gray-500"
        disabled={
          isLoadingAcceptTx ||
          isWritingAccept ||
          isFetchingAccept ||
          isAcceptError
        }
        onClick={() => accept?.()}
      >
        Stake
      </button>
    </div>
  );
};
export default Accept;
