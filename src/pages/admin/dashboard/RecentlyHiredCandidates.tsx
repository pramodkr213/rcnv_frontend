import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Hire {
  name: string;
  company: string;
  date: string;
}

const recentHires: Hire[] = [
  { name: "Aarav Sharma", company: "TechSphere", date: "30/05/2025" },
  { name: "Diya Patel", company: "Coco-Industry", date: "29/05/2025" },
  { name: "Karan Mehta", company: "DevDynamos", date: "28/05/2025" },
  { name: "Sneha Iyer", company: "CodeWizards", date: "27/05/2025" },
  { name: "Ravi Verma", company: "SoftMatrix", date: "26/05/2025" },
];

const RecentlyHiredCandidates: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between text-gray-800 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Recently Hired Candidates</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>

      {/* Dropdown Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="divide-y divide-gray-100">
          {recentHires.map((hire, index) => (
            <div
              key={index}
              className="px-5 py-4 flex justify-between cursor-pointer items-center hover:bg-purple-100 transition"
            >
              <div>
                <div className="text-base font-medium text-gray-800">
                  {hire.name}
                </div>
                <div className="text-sm text-gray-500">{hire.company}</div>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {hire.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyHiredCandidates;
