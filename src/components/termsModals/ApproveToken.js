import { NewTermContext } from "../../contexts/NewTermContext";
import { useContext, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../../config/index";
import { useAccount } from "wagmi";
import Loader from "../Loader";
import { ethers } from "ethers";

const ApproveToken = () => {
  const { address } = useAccount();
  const { nextStep, term } = useContext(NewTermContext);
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
      ethers.utils.parseEther(term.maxRenumeration),
    ],
  });

  const {
    data: approveData,
    write: approve,
    isLoading,
  } = useContractWrite(approveConfig);

  const { isSuccess: isApprovedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: approveData?.hash,
      confirmations: 1,
    });
  approveData && console.log(approveData);

  //watching to swith after txn successful
  useEffect(() => {
    if (isApprovedSuccess == true) {
      nextStep();
    }
  }, [isApprovedSuccess]);

  return (
    <div className={`modal bg-indigo-500 w-[90%] lg:max-w-[600px] p-5`}>
      <span className="text-red-500">{isError && error.reason}</span>
      <div className="flex items-center justify-center">
        {(isLoadingTx || isFetching || isLoading) && <Loader />}
      </div>
      <p>You are about to approve {term.maxRenumeration}NRN and your NFT.</p>
      <p>1. Approve your Token</p>
      <p>2. Approve your NFT</p>

      <br />
      <button
        className="bg-black text-white px-5 py-4 rounded-sm disabled:bg-gray-500"
        onClick={() => approve()}
        disabled={isFetching || isLoadingTx || isLoading || isError}
      >
        Approve Tokens
      </button>
    </div>
  );
};
export default ApproveToken;
