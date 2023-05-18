import { NewTermContext } from "../../contexts/NewTermContext";
import { useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../../config/index";
import LineLoader from "../loaders/LineLoader";

const ApproveNFT = () => {
  const { address } = useAccount();
  const { nextStep, term } = useContext(NewTermContext);

  const {
    config: approveConfig,
    isError,
    error,
    isFetching,
  } = usePrepareContractWrite({
    address: config.nft.address,
    abi: config.nft.abi,
    functionName: "approve",
    from: address,
    args: [config.contract.address, parseInt(term.selectedTokenId)],
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

  //watching to swith after txn successful
  useEffect(() => {
    if (isApprovedSuccess == true) {
      nextStep();
    }
  }, [isApprovedSuccess]);
  return (
    <div className="modal bg-indigo-500 w-[90%] lg:max-w-[600px] p-5">
      <div className="flex items-center justify-center min-h-[10px]">
        {(isLoadingTx || isFetching || isLoading) && <LineLoader />}
      </div>
      {isError ||
        (isWriteError && (
          <span className="text-red text-xs">
            {error.reason || writeError.reason}
          </span>
        ))}

      <h3 className="text-lg font-bold mb-2">Great! Now Approve your NFT</h3>
      <p>1. Approve your Token ✅</p>
      <p>2. Approve your NFT</p>
      <p>3. Click on "Create Term"</p>

      <br />
      <button
        className="bg-black text-white px-5 py-4 rounded-sm disabled:bg-gray-500"
        disabled={isFetching || isLoadingTx || isLoading || isError}
        onClick={() => approve?.()}
      >
        Approve NFT
      </button>
    </div>
  );
};
export default ApproveNFT;
