import { createContext, useContext, useState } from "react";

const InputContext = createContext();
export const useInput = () => useContext(InputContext);

export const InputProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const setInputValue = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <InputContext.Provider value={{ inputs, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};
