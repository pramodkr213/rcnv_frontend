import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => (
  <div className="mb-6 w-full">
    {label && (
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
          {icon}
        </span>
      )}
      <input
        className={`${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-3 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${
          className || ""
        }`}
        {...props}
      />
    </div>
    {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
  </div>
);

export default Input;
