import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ResumeBuilderSection:React.FC = () => {
  return (
    <section className="bg-[#f5f8fc] py-16 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            No resume? No problem.
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Let us help you create one or improve the one you've got.
          </p>

          <ul className="space-y-4 text-gray-800 text-base mb-8">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg mt-1">•</span>
              <span>AI-powered resume builder</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg mt-1">•</span>
              <span>Intelligent feedback engine</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg mt-1">•</span>
              <span>Optimized for freshers</span>
            </li>
          </ul>

          <button className="bg-[#0047ab] text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#003a8c] transition">
            Build my resume <FaArrowRight />
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/resume-illustration.png" // <- Replace this with your actual image path
            alt="Resume Builder"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilderSection;
