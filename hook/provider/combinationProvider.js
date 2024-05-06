import { useState, useContext, createContext } from "react";

const CombinationContext = createContext([]);

const initValues = {
  user_id: 1,
  id: null,
  environment_id: null,
  name: "未命名",
  stockList: [],
  stockIdCache: new Set()
}

export const CombinationProvider = ({ children }) => {
  const [combination, setCombination] = useState(initValues);
  const resetCombination = () => setCombination({...initValues})

  return (
    <CombinationContext.Provider value={{ combination, setCombination, resetCombination }}>
      {children}
    </CombinationContext.Provider>
  );
};

export const useCombination = () => useContext(CombinationContext)