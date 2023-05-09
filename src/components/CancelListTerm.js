import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import config from "../config";
import { useState } from "react";
import { useRouter } from "next/router";
const CancelListTerm = ({ term }) => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const {
    config: Cancelconfig,
    isError,
    error,
    isFetching,
  } = usePrepareContractWrite({
    address: config.contract.address,
    abi: config.contract.abi,
    functionName: "cancelRequirement",
    args: [parseInt(term.termId)],
  });

  const {
    data,
    write: cancel,
    isLoading,
  } = useContractWrite({
    config: Cancelconfig,
    onSuccess() {
      router.push("/profile");
    },
  });

  const { isSuccess: isSuccessAccept, isLoading: isLoadingAcceptTx } =
    useWaitForTransaction({
      hash: data?.hash,
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
          disabled={isLoading}
          onClick={() => cancel?.()}
        >
          Yes
        </button>

        <span onClick={() => setToggle(false)} className="p-2">
          Cancel
        </span>
      </div>
      <button
        className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 font-semibold text-white group-hover:bg-black"
        onClick={() => setToggle(true)}
      >
        Cancel
      </button>
    </div>
  );
};
export default CancelListTerm;
