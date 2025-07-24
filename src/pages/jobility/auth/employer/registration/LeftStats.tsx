import React from "react";

const LeftStats: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Each stat block */}
      {[
        { value: "25Mn+", label: "Candidates looking for internships" },
        { value: "17Mn+", label: "Candidates hired PAN India" },
        { value: "200 K+", label: "Job Profiles" },
        { value: "250 K+", label: "Companies Hiring on Jobility" },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white border max-w-md border-gray-300 rounded-md p-4 flex items-center gap-5"
        >
          <span className="text-blue-700 text-3xl font-bold w-auto">
            {item.value}
          </span>
          <p className="h-10 bg-black w-1 rounded-full"></p>
          <span className="text-gray-900 text-xl font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeftStats;
