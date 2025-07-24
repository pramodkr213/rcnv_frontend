import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className,
  ...props
}) => (
  <div className="mb-6 w-full">
    {label && (
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <textarea
      className={` p-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none ${
        className || ""
      }`}
      {...props}
    />
    {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
  </div>
);

export default Textarea;
