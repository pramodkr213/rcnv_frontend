import React, { useState } from "react";
import { Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJobsApi } from "../../../api/employer/employer";
import { formatDate } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useActionModal } from "../../../context/ActionModal";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/loader/TableLoader";

const MyJobs: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { show, hide } = useActionModal();
  const navigate = useNavigate();

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await getJobsApi();
      return res?.data;
    },
  });

  const handleActiveClick = (id: string) => {
    show({
      title: "Confirm Action",
      description: `Are you sure you want to ${
        isActive ? "Deactivate" : "Activate"
      } this job?`,
      onConfirm: () => {
        setIsActive(!isActive);
        hide();
      },
      isNormal: isActive ? false : true,
      confirmText: isActive ? "Deactivate" : "Activate",
    });
  };

  return (
    <div className="flex flex-col gap-5  bg-[#f6f8fc] p-6 w-full overflow-y-auto">
      <div>
        <div className="py-4 rounded-md">
          <div className="p-4 rounded-md border border-gray-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 mb-4 gap-6">
              {/* Position input */}
              <div className="">
                <label
                  htmlFor="position"
                  className="block mb-1 font-medium text-start"
                >
                  Position
                </label>
                <input
                  id="position"
                  type="text"
                  placeholder="Position"
                  className="border rounded px-4 py-2 w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block mb-1 font-medium text-start"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Position"
                  className="border rounded px-4 py-2 w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Date range inputs */}
              <div>
                <label
                  htmlFor="dateFrom"
                  className="block mb-1 font-medium text-start"
                >
                  From
                </label>
                <input
                  id="dateFrom"
                  type="date"
                  className="border rounded px-4 py-2 w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="dateTo"
                  className="block mb-1 font-medium text-start"
                >
                  To
                </label>
                <input
                  id="dateTo"
                  type="date"
                  className="border rounded px-4 py-2 w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 text-start">Total Jobs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-[#D1E6FF]">
              <tr>
                <th className="p-2 border text-center">Job Title</th>
                <th className="p-2 border text-center">Location</th>
                <th className="p-2 border text-center">Experience</th>
                <th className="p-2 border text-center">Salary</th>
                <th className="p-2 border text-center">Posted Date</th>
                <th className="p-2 border text-center">Applications</th>
                <th className="p-2 border text-center">Edit</th>
                <th className="p-2 border text-center">Active</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10}>
                    <TableLoader />
                  </td>
                </tr>
              ) : isError ? (
                <div>Failed to load jobs. Please try again.</div>
              ) : (
                jobs.map((job, index) => (
                  <tr key={index} className="text-sm">
                    <td className="p-2 text-center border text-blue-500 cursor-pointer underline">
                      <span
                        onClick={() => navigate(`/user/stats/myjobs/${job.id}`)}
                      >
                        {job.title}
                      </span>
                    </td>
                    <td className="p-2 text-center border">{job.location}</td>
                    <td className="p-2 text-center border">
                      {job.fresher ? (
                        <span>Fresher</span>
                      ) : (
                        <span>
                          {job.minExperience} - {job.maxExperience}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center border">
                      ₹ {job.minSalary}- {job.maxSalary}
                    </td>
                    <td className="p-2 text-center border">
                      {formatDate(job.createdAt)}
                    </td>
                    <td className="p-2 text-center border ">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-lg">
                          {job.numberOfApplications}
                        </div>
                        {/* <div title="View" className="cursor-pointer">
                            <SquareChartGantt />
                          </div> */}
                        <div
                          title="View"
                          className="cursor-pointer underline text-blue-500"
                        >
                          View
                        </div>
                      </div>
                    </td>

                    <td className="p-2 border">
                      <div className="flex justify-center items-center">
                        <Edit
                          size={20}
                          className=" text-gray-500 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleActiveClick("2")}
                          className={`w-10 h-5 flex items-center rounded-full px-0.5 transition-colors duration-300 ${
                            isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                              isActive ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default MyJobs;
