import React, { createContext, useContext, useState } from "react";

interface ErrorProps {
  children: React.ReactNode;
}

export interface ErrorsState {
  login: Record<string, string>;
  adminLogin: Record<string, string>;
  register: Record<string, string>;
  employerRegister: Record<string, string>;
  companyRegister: Record<string, string>;
  post: Record<string, string>;
}

interface ErrorContextType {
  errors: ErrorsState;
  setFormErrors: (
    form: keyof ErrorsState,
    newErrors: Record<string, string>
  ) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<ErrorProps> = (props) => {
  const { children } = props;
  const [errors, setErrors] = useState({
    login: {},
    adminLogin: {},
    register: {},
    employerRegister: {},
    companyRegister: {},
    post: {},
  });

  const setFormErrors = (
    form: keyof ErrorsState,
    newErrors: Record<string, string>
  ) => {
    setErrors((prev) => ({ ...prev, [form]: newErrors }));
  };

  return (
    <ErrorContext.Provider value={{ errors, setFormErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
