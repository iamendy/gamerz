import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../config";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Loader from "./Loader";

const SettleButton = ({ term }) => {
  const { address } = useAccount();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const {
    config: settleConfig,
    isError,
    error,
    isFetching,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "settleTerms",
    from: address,
    args: [parseInt(term.termId)],
  });

  const {
    data,
    write: settle,
    isLoading,
  } = useContractWrite({
    ...settleConfig,
    onSuccess() {
      router.push("/profile");
    },
  });

  const handleSettle = () => {
    setToggle(false);
  };

  const { isLoading: isLoadingAcceptTx } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => router.push("/profile"),
  });

  return (
    <div>
      <div
        className={`${
          toggle ? "scale-100" : "scale-0"
        } absolute flex justify-center items-center flex-col bg-indigo-400 top-0 left-0 w-full h-full`}
      >
        <p>Are you Sure?</p>
        <button
          className="px-3 py-1 my-3 rounded-lg bg-indigo-600 disabled:bg-gray-500"
          disabled={isLoading || isLoadingAcceptTx}
          onClick={() => settle?.()}
        >
          {isLoading || isLoadingAcceptTx ? "Processing" : "Yes"}
        </button>

        <span onClick={() => setToggle(false)} className="p-2">
          Cancel
        </span>
      </div>
      <button
        className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black"
        onClick={() => setToggle(true)}
      >
        Settle
      </button>
    </div>
  );
};
export default SettleButton;
