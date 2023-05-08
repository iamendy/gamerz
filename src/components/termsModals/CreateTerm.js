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

const CreateTerm = () => {
  const { address } = useAccount();
  const { nextStep, term, step } = useContext(NewTermContext);

  const {
    config: termConfig,
    isLoading: isPreparing,
    isError,
    error,
    isFetching,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "createRequirement",
    from: address,
    args: [
      term.duration,
      term.pricePerElo,
      term.maxRenumeration,
      term.proGamerStake,
      0, //serviceToken USDC
      1,
      1300,
      [],
    ],
  });

  const {
    data: termData,
    write: createTerm,
    isLoading,
  } = useContractWrite(termConfig);

  const { isSuccess: isCreatedSuccess, isLoading: isLoadingTx } =
    useWaitForTransaction({
      hash: termData?.hash,
    });

  //watching to swith after txn successful
  useEffect(() => {
    if (isCreatedSuccess == true) {
      nextStep();
    }
  }, [isCreatedSuccess]);

  return (
    <div className="modal bg-indigo-500 w-[90%] lg:max-w-[600px] p-5">
      <div className="flex items-center justify-center min-h-[10px]">
        {(isLoadingTx || isFetching || isLoading) && <LineLoader />}
      </div>
      <h3 className="text-lg font-bold mb-2">Awesome! All systems ready</h3>
      <p>1. Approve your Token ✅</p>
      <p>2. Approve your NFT ✅</p>
      <p>3. Click on "Create Term"</p>

      <br />
      <button
        className="bg-black text-white px-5 py-4 rounded-sm disabled:bg-gray-500"
        disabled={isFetching || isLoadingTx || isLoading || isError}
        onClick={() => createTerm?.()}
      >
        Create Term
      </button>
    </div>
  );
};
export default CreateTerm;
