import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecentInternshipsApi } from "../../../api/admin/admin";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/helper";

const RecentlyPostedInternships: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const { data: recentInternships } = useSuspenseQuery({
    queryKey: ["recentInternships"],
    queryFn: async () => {
      const res = await getRecentInternshipsApi();
      return res.data;
    },
  });

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between text-gray-800 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Recently Posted Internships</span>
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
          {recentInternships.length > 0 ? (
            recentInternships.map((internship, index) => (
              <div
                key={index}
                // onClick={() =>
                //   navigate(`/admin/stats/internship/${internship.id}`)
                // }
                className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-purple-100 transition"
              >
                <div className="flex gap-6">
                  <div>
                    <img src={internship.logo} alt="logo" className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">
                      {internship.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {internship.companyName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {internship.location}
                    </div>
                  </div>
                </div>
                <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                  {formatDate(internship.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <div className="px-5 py-4 text-center text-gray-500">
              No recently posted internships available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPostedInternships;
