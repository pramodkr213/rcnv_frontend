import React, { createContext, useContext, useState } from "react";
import { Loader } from "../components/ui/loader/Loader.tsx";

// 1. Define the context type
interface LoaderContextType {
    loading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
}

// 2. Create the context
const UserLoaderContext = createContext<LoaderContextType>({
    loading: false,
    showLoader: () => {},
    hideLoader: () => {},
});

// 3. Provider component
interface LoaderProviderProps {
    children: React.ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <UserLoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
            {children}
            {loading && <Loader overlay />}
        </UserLoaderContext.Provider>
    );
};

// 4. Custom hook
export const useUserLoader = (): LoaderContextType => useContext(UserLoaderContext);
