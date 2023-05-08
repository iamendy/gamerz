import CloseNew from "./icons/CloseNew";
import { useContext, useEffect } from "react";
import { NewTermContext } from "../contexts/NewTermContext";
import ApproveToken from "./termsModals/ApproveToken";
import ApproveNFT from "./termsModals/ApproveNFT";
import CreateTerm from "./termsModals/CreateTerm";
import Success from "./termsModals/Success";
const NewTermModal = ({ isOpen, toggle }) => {
  const { step, reset } = useContext(NewTermContext);

  return (
    <div
      className={`${
        isOpen ? "scale-100" : "scale-0"
      } absolute top-0 left-0 w-full h-full backdrop-blur bg-black/70 flex justify-center items-center`}
    >
      <CloseNew toggle={toggle} reset={reset} />
      {step == 1 && <ApproveToken />}

      {step == 2 && <ApproveNFT />}

      {step == 3 && <CreateTerm />}

      {step == 4 && <Success />}
    </div>
  );
};
export default NewTermModal;
