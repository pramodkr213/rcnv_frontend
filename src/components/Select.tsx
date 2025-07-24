import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  ...props
}) => (
  <div className="mb-6 w-full">
    {label && (
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <select
      className={`pl-4 pr-8 py-3 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${
        className || ""
      }`}
      {...props}
    >
      <option value="" disabled selected hidden>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
  </div>
);

export default Select;
