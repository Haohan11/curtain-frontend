import { useState, useContext, createContext } from "react";

const CombinationContext = createContext([]);

const initValues = {
  id: null,
  environment_id: null,
  name: "未命名",
  stockList: [],
  stockIdCache: new Set(),
};

export const CombinationProvider = ({ children }) => {
  const [combination, setCombination] = useState(initValues);

  const resetCombination = () => setCombination({ ...initValues, stockIdCache: new Set(), });
  const addToCombination = (stock) => {
    if (combination.stockIdCache.has(stock.id)) return;
    setCombination((prev) => ({
      ...prev,
      stockIdCache: prev.stockIdCache.add(stock.id),
      stockList: [...prev.stockList, stock],
    }));
  };
  const removeFromCombination = (id) => {
    setCombination((prev) => {
      prev.stockIdCache.delete(id);
      return {
        ...prev,
        stockList: prev.stockList.filter((stock) => stock.id !== id),
      };
    });
  };
  const loadCombination = (comb) => {
    setCombination({
      ...comb,
      stockIdCache: new Set(comb.stockList.map((stock) => stock.id)),
    });
  };

  return (
    <CombinationContext.Provider
      value={{
        combination,
        setCombination,
        resetCombination,
        addToCombination,
        removeFromCombination,
        loadCombination,
      }}
    >
      {children}
    </CombinationContext.Provider>
  );
};

export const useCombination = () => useContext(CombinationContext);
