// import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   encryptToCookie,
//   decryptFromCookie,
//   removeCookie,
// } from "../utils/cookieCrypto";

// export type User = {
//   email: string;
//   role: string;
// };

// interface AuthContextType {
//   user: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const COOKIE_KEY = import.meta.env.VITE_COOKIE_KEY;

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = decryptFromCookie<User>(COOKIE_KEY);
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const login = (user: User) => {
//     setUser(user);
//     encryptToCookie(COOKIE_KEY, user);
//   };

//   const logout = () => {
//     setUser(null);
//     removeCookie(COOKIE_KEY);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
