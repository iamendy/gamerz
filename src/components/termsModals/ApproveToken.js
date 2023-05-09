import { NewTermContext } from "../../contexts/NewTermContext";
import { useContext, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../../config/index";
import { useAccount } from "wagmi";
import LineLoader from "../loaders/LineLoader";
import { ethers } from "ethers";

const ApproveToken = () => {
  const { address } = useAccount();
  const { nextStep, term, nft } = useContext(NewTermContext);
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
      ethers.utils.parseEther(term?.maxRenumeration),
    ],
  });

  const {
    data: approveData,
    write: approve,
    isLoading,
    isError: isWriteError,
    error: writeError,
  } = useContractWrite(approveConfig);

  const { isSuccess: isApprovedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: approveData?.hash,
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
      <div className="flex items-center justify-center min-h-[10px]">
        {(isLoadingTx || isFetching || isLoading) && <LineLoader />}
      </div>
      {isError ||
        (isWriteError && (
          <span className="text-red text-xs">
            {error.reason || writeError.reason}
          </span>
        ))}
      <h3 className="text-lg font-bold mb-2">
        You are about to approve {term.maxRenumeration}NRN and{" "}
        {nft.contract.name} #{nft.tokenId}
      </h3>
      <p>1. Approve your Tokens</p>
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
