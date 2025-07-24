import React from "react";
import { AuthLoader } from "./authLoader";

interface LoaderProps {
  overlay?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ overlay }) => (
  <div
    className={`flex justify-center items-center ${
      overlay ? "fixed inset-0 bg-black/30 z-50" : "w-screen h-screen"
    }`}
  >
    <AuthLoader />
  </div>
);
