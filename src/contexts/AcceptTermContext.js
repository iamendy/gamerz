import { createContext, useState } from "react";

export const AcceptTermContext = createContext();

function AcceptTermProvider({ children }) {
  const [term, setTerm] = useState({});
  const [step, updateStep] = useState(0);

  const updateSelectedTerm = (term) => {
    setTerm({
      termId: term.termId,
      casualGamer: term.casualGamer,
      currentEloScore: term.currentEloScore,
      pricePerElo: term.pricePerElo,
      proGamersStake: term.proGamersStake,
      duration: term.duration,
      maxRenumeration: term.maxRenumeration,
    });
  };

  const reset = () => {
    setTerm({});
    updateStep(0);
  };

  const nextStep = () => {
    updateStep(step + 1);
  };

  return (
    <AcceptTermContext.Provider
      value={{ term, updateSelectedTerm, reset, step, nextStep }}
    >
      {children}
    </AcceptTermContext.Provider>
  );
}

export default AcceptTermProvider;
