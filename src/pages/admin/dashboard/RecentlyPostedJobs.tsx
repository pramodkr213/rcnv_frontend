import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecentJobsApi } from "../../../api/admin/admin";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/helper";

const RecentlyPostedJobs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const { data: recentJobs } = useSuspenseQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      const res = await getRecentJobsApi();
      return res.data;
    },
  });

  return (
    <div className="mt-6 bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between text-gray-800 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Recently Posted Jobs</span>
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
          {recentJobs.length > 0 ? (
            recentJobs.map((job, index) => (
              <div
                key={index}
                // onClick={() => navigate(`/admin/stats/job/${job.id}`)}
                className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-purple-100 transition"
              >
                <div className="flex gap-6">
                  <div>
                    <img src={job.logo} alt="logo" className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.companyName}
                    </div>
                    <div className="text-sm text-gray-500">{job.location}</div>
                  </div>
                </div>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {formatDate(job.createdAt)}
                </span>
              </div>
            ))
          ) : (
            <div className="px-5 py-4 text-center text-gray-500">
              No recently posted jobs available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPostedJobs;
