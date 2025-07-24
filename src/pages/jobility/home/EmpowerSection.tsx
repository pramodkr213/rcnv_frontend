import React from "react";
import { FaGoogle, FaEnvelope } from "react-icons/fa";

const EmpowerSection:React.FC = () => {
  return (
    <section className="bg-[#e8f0fe] container py-10 mx-auto lg:px-30 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute w-6 h-6 bg-white rounded-full bottom-6 left-6 opacity-80" />
      <div className="absolute w-4 h-4 border-2 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute w-20 h-20 bg-white rounded-full top-0 right-1/4 opacity-40" />
      <div className="absolute w-10 h-10 bg-white rounded-full bottom-4 right-8 opacity-60" />
      <div className="absolute w-10 h-10 border-2 border-white rounded-full top-4 right-4 opacity-40" />

      {/* Content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-snug">
            Empower your career with <br /> Jobility today
          </h2>
        </div>

        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <button className="flex items-center gap-2 bg-[#174ea6] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#0c3d91] transition">
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>
          <button className="flex items-center gap-2 bg-[#1da1f2] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1a91da] transition">
            <FaEnvelope className="text-lg" />
            Continue with Email
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmpowerSection;
