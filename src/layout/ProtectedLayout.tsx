import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/jobility/AuthContext";
import { getDecryptedAuthCookie } from "../utils/cookieCrypto";
import { AuthLoader } from "../components/loader/authLoader";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  const { loading } = useAuth();

  const user = getDecryptedAuthCookie();

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black/30">
        <AuthLoader />
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 to-purple-100">
      <Sidebar />
      <main className="flex-1 p-4 mt-10 md:mt-1 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
