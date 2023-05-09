import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../../config";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { AcceptTermContext } from "../../contexts/AcceptTermContext";
import Loader from "../Loader";

const Approve = () => {
  const { term, step, nextStep } = useContext(AcceptTermContext);
  const { address } = useAccount();
  const {
    config: approveConfig,
    isError,
    error,
    isFetching,
  } = usePrepareContractWrite({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "approve",
    from: address,
    args: [
      config.contract.address,
      ethers.utils.parseEther(`${term.proGamersStake.toString()}`),
    ],
  });

  const {
    data: approveData,
    write: approve,
    isLoading,
    isError: isWriteError,
  } = useContractWrite(approveConfig);

  const { isSuccess: isApprovedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: approveData?.hash,
      confirmations: 1,
    });

  useEffect(() => {
    if (isApprovedSuccess == true) {
      nextStep();
    }
  }, [isApprovedSuccess]);

  return (
    <div className="flex flex-col space-y-3">
      {isError ||
        (isWriteError && <p className="text-red-500 p-5">{error?.reason}</p>)}
      <p>
        Accepting this game will require you to stake{" "}
        {term.proGamersStake.toString()} NRN
      </p>
      {(isLoadingTx || isLoading || isFetching) && <Loader />}
      <button
        className="bg-indigo-600 p-2 rounded-sm disabled:bg-gray-500"
        disabled={isLoadingTx || isLoading || isFetching || isError}
        onClick={() => approve?.()}
      >
        approve
      </button>
    </div>
  );
};
export default Approve;
