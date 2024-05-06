import { CombinationProvider } from "@/hook/provider/combinationProvider";

const defaultLayout = ({ children }) => {
  return (
    <CombinationProvider>
      {children}
    </CombinationProvider>
  );
};

export default defaultLayout;
