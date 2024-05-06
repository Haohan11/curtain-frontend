import { useState, useContext, createContext } from "react";

const CombinationContext = createContext([]);

export const CombinationProvider = ({ children }) => {
  const [combination, setCombination] = useState({
    id: null,
    environment_id: null,
    name: "未命名",
    stockList: [],
    stockIdCache: new Set()
  });

  return (
    <CombinationContext.Provider value={{ combination, setCombination }}>
      {children}
    </CombinationContext.Provider>
  );
};

export const useCombination = () => useContext(CombinationContext)