import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { ArrowDownToLine, Trash2 } from "lucide-react";
import { getJobApplicationsApi } from "../../../api/admin/admin";
import TableLoader from "../../../components/loader/TableLoader";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";

export interface JobApplicationFilterState {
  page: number;
  query?: string;
  location?: string;
  status?: string;
  companyName?: string;
  date?: string;
}

const JobApplicationList: React.FC = () => {
  const [filters, setFilters] = useState<JobApplicationFilterState>({
    page: 0,
    query: "",
    location: "",
    status: "",
    companyName: "",
    date: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [totalCount, setTotalCount] = useState<number>(0);

  const debouncedTextInputs = useMemo(
    () =>
      debounce((updatedFields: Partial<JobApplicationFilterState>) => {
        setDebouncedFilters((prev) => ({
          ...prev,
          ...updatedFields,
        }));
      }, 500),
    []
  );

  const handleFilterChange = (
    key: keyof JobApplicationFilterState,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
    if (["query", "location", "companyName"].includes(key)) {
      debouncedTextInputs({ [key]: value });
    } else {
      setDebouncedFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
    }
  };

  useEffect(() => {
    return () => {
      debouncedTextInputs.cancel();
    };
  }, [debouncedTextInputs]);

  const {
    data: applicationsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", debouncedFilters],
    queryFn: async () => {
      const res = await getJobApplicationsApi(debouncedFilters);
      setTotalCount(res.totalCount);
      return res?.data;
    },
  });

  const handleDownload = (resumeUrl: string) => {
    if (resumeUrl) window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  const clearFilter = () => {
    const cleared = {
      page: 0,
      query: "",
      location: "",
      status: "",
      companyName: "",
      date: "",
    };
    setFilters(cleared);
    setDebouncedFilters(cleared);
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg font-medium">
        Failed to load Applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filter Section */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
          <input
            type="search"
            placeholder="Name/Email/Mobile No"
            value={filters.query}
            onChange={(e) => handleFilterChange("query", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          >
            <option value="">Status</option>
            <option value="WAITING">Waiting</option>
            <option value="SELECTED">Selected</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Company Name"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
        </div>
        <button
          onClick={clearFilter}
          className="bg-[#0754AE] cursor-pointer text-white px-4 py-2 rounded-md  text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Applications</h2>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Download Excel
        </button> */}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] text-center w-full shadow-md rounded-md text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">View Resume</th>
              <th className="px-4 py-2">Apply Date</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={11}>
                  <TableLoader />
                </td>
              </tr>
            ) : applicationsData.length > 0 ? (
              applicationsData?.map((item, i: number) => (
                <tr key={i} className="even:bg-gray-100">
                  <td className="px-4 py-2">{item.status || "-"}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 cursor-pointer hover:text-blue-700">
                      <ArrowDownToLine
                        onClick={() =>
                          handleDownload(item.applicant.resumeLink)
                        }
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    {formatDate(item.appliedAt) || "-"}
                  </td>
                  <td className="px-4 py-2">{item.applicant.email || "-"}</td>
                  <td className="px-4 py-2">
                    {item.applicant.firstName || "-"}
                  </td>
                  <td className="px-4 py-2">{item.applicant.phone || "-"}</td>
                  <td className="px-4 py-2">
                    {item.company?.companyName || "-"}
                  </td>
                  <td className="px-4 py-2">{item.job?.title || "-"}</td>
                  <td className="px-4 py-2">
                    {item.job?.minExperience} - {item.job?.maxExperience}
                  </td>
                  <td className="px-4 py-2">{item.job?.location || "-"}</td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="py-8 text-gray-600">
                  No entries found for given filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {applicationsData?.length > 1 && (
        <div className="w-full flex justify-center items-center">
          <Pagination
            currentPage={filters.page}
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      )}
    </div>
  );
};

export default JobApplicationList;
