import React, { Dispatch, SetStateAction, createContext, useContext } from "react";

// Define the context type
type RefreshContextType = [boolean, Dispatch<SetStateAction<boolean>>];

// Create the context
export const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useRefreshContext = (): RefreshContextType => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error("useRefreshContext must be used within a RefreshContext.Provider");
  }
  return context;
};
