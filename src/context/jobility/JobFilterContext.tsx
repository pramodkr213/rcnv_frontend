// contexts/JobFilterContext.tsx
import React, { createContext, useContext, useState } from "react";

export interface JobFilterState {
  page: number; // Page number for pagination
  role: string;
  location: string;
  experience: string;
  jobType: string;
  salary: [number, number];
  days: number;
  mode: string;
  sector:string;
}

const defaultJobFilters: JobFilterState = {
  page: 0,
  role: "",
  location: "",
  experience: "",
  jobType: "",
  salary: [15000, 50000],
  days: 1,
  mode: "",
  sector:""
};

interface JobFilterContextType {
  filters: JobFilterState;
  setFilters: React.Dispatch<React.SetStateAction<JobFilterState>>;
  resetFilters: () => void;
  setSector: (sector: string) => void; 
}

const JobFilterContext = createContext<JobFilterContextType | undefined>(
  undefined
);

export const JobFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<JobFilterState>(defaultJobFilters);

  const resetFilters = () => {
    setFilters(defaultJobFilters);
  };

   const setSector = (sector: string) => {
    setFilters((prev) => ({
      ...prev,
      sector,
      page: 0,
    }));
  };

  return (
    <JobFilterContext.Provider value={{ filters, resetFilters, setFilters ,setSector}}>
      {children}
    </JobFilterContext.Provider>
  );
};

export const useJobFilterContext = () => {
  const context = useContext(JobFilterContext);
  if (!context) {
    throw new Error(
      "useJobFilterContext must be used within a JobFilterProvider"
    );
  }
  return context;
};

export default JobFilterProvider;
