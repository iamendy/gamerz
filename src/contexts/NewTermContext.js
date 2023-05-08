import { createContext, useState } from "react";

export const NewTermContext = createContext();

function NewTermProvider({ children }) {
  const [form, setForm] = useState({
    hasFilledForm: false,
  });

  const [step, setStep] = useState(0);

  const [term, setTerm] = useState({
    duration: "",
    pricePerElo: "",
    maxRenumeration: "",
    proGamerStake: "",
  });

  const updateTerm = (e) => {
    setTerm((t) => ({ ...t, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    if (step <= 5) {
      setStep(step + 1);
    }
  };

  const updateForm = () => {
    setStep(step + 1);
    setForm((form) => ({ ...form, hasFilledForm: true }));
  };

  return (
    <NewTermContext.Provider
      value={{ step, nextStep, term, updateTerm, updateForm }}
    >
      {children}
    </NewTermContext.Provider>
  );
}

export default NewTermProvider;
