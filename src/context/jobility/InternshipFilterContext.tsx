// contexts/InternshipFilterContext.tsx
import React, { createContext, useContext, useState } from "react";

export interface InternshipFilterState {
  page: number; // Page number for pagination
  role: string;
  location: string;
  internshipType: string;
  stipend: [number, number];
  days: number;
  mode: string;
  incentive: string;
}

const defaultInternshipFilters: InternshipFilterState = {
  page: 0,
  role: "",
  location: "",
  internshipType: "",
  stipend: [2000, 30000],
  days: 1,
  mode: "",
  incentive: "",
};

interface InternshipFilterContextType {
  filters: InternshipFilterState;
  setFilters: React.Dispatch<React.SetStateAction<InternshipFilterState>>;
  resetFilters: () => void;
}

const InternshipFilterContext = createContext<
  InternshipFilterContextType | undefined
>(undefined);

export const InternshipFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<InternshipFilterState>(
    defaultInternshipFilters
  );

  const resetFilters = () => {
    setFilters(defaultInternshipFilters);
  };

  return (
    <InternshipFilterContext.Provider
      value={{ filters, resetFilters, setFilters }}
    >
      {children}
    </InternshipFilterContext.Provider>
  );
};

export const useInternshipFilterContext = () => {
  const context = useContext(InternshipFilterContext);
  if (!context) {
    throw new Error(
      "useInternshipFilterContext must be used within an InternshipFilterProvider"
    );
  }
  return context;
};

export default InternshipFilterProvider;
