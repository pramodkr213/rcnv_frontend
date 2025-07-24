import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

interface ProcessingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  processing?: boolean;
  children: React.ReactNode;
}

const ProcessingButton: React.FC<ProcessingButtonProps> = ({
  processing = false,
  children,
  ...props
}) => (
  <button
    {...props}
    disabled={processing || props.disabled}
    className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg shadow-lg transition disabled:opacity-60 flex items-center justify-center ${
      props.className || ""
    }`}
  >
    {processing ? (
      <motion.span
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="inline-block mr-2"
      >
        <FaSpinner size={20} />
      </motion.span>
    ) : null}
    {children}
  </button>
);

export default ProcessingButton;
