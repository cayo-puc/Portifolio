import { createContext, useContext } from "react";

export const PortfolioModeContext = createContext(null);

export function usePortfolioMode() {
  return useContext(PortfolioModeContext);
}
