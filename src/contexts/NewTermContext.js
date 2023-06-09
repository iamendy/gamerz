import { createContext, useEffect, useState } from "react";

export const NewTermContext = createContext();

function NewTermProvider({ children }) {
  const [hasFilledForm, sethasFilledForm] = useState(false);
  const [step, setStep] = useState(0);
  const [nft, setNft] = useState(null);
  const [term, setTerm] = useState({
    duration: "",
    pricePerElo: "",
    maxRenumeration: "",
    proGamerStake: "",
    selectedTokenId: "",
  });

  const captureNFT = (nft) => {
    setNft(nft);
    setTerm((t) => ({ ...t, selectedTokenId: nft.tokenId }));
  };

  useEffect(() => {
    if (
      term.duration &&
      term.pricePerElo &&
      term.maxRenumeration &&
      term.proGamerStake &&
      term.selectedTokenId
    ) {
      sethasFilledForm(true);
    } else {
      sethasFilledForm(false);
    }
  }, [term]);

  const updateTerm = (e) => {
    setTerm((t) => ({ ...t, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    if (step <= 5) {
      setStep(step + 1);
    }
  };

  const reset = () => setStep(0);

  return (
    <NewTermContext.Provider
      value={{
        step,
        nextStep,
        reset,
        term,
        nft,
        captureNFT,
        updateTerm,
        hasFilledForm,
      }}
    >
      {children}
    </NewTermContext.Provider>
  );
}

export default NewTermProvider;
