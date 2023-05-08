import Close from "../icons/Close";
import Accept from "./Accept";
import Approve from "./Approve";
import { useContext } from "react";
import { AcceptTermContext } from "../../contexts/AcceptTermContext";
import Link from "next/link";
const AcceptModal = ({ isOpen, toggle }) => {
  const { step, reset } = useContext(AcceptTermContext);
  return (
    <div
      className={`${
        isOpen ? "scale-100" : "scale-0"
      } absolute flex justify-center items-center w-full h-screen top-0 left-0 bg-indigo-400/90 backdrop-blur z-100`}
    >
      <Close toggle={toggle} reset={reset} />

      <div className="">
        {step === 1 && <Approve />}
        {step === 2 && <Accept />}
        {step == 3 && (
          <div className="flex flex-col space-y-3 text-center justify-center">
            <p>Paired Successfully! 🎉</p>
            <Link
              href="/profile"
              className="bg-indigo-600 p-2 rounded-sm disabled:bg-gray-500"
            >
              Check Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default AcceptModal;
