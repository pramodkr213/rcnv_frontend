import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { Trash2 } from "lucide-react";
import {
  activeDeactiveJobApi,
  deleteJobApi,
  getJobsApi,
} from "../../../api/admin/admin";

import { useNavigate } from "react-router-dom";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";
import TableLoader from "../../../components/loader/TableLoader";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";

export interface JobFilterState {
  page: number;
  title?: string;
  location?: string;
  companyName?: string;
  date?: string;
}

const JobList: React.FC = () => {
  const navigate = useNavigate();
  const { show, hide } = useActionModal();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [filters, setFilters] = useState<JobFilterState>({
    page: 0,
    title: "",
    location: "",
    companyName: "",
    date: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce only text input filters
  const debouncedTextInputs = useMemo(
    () =>
      debounce((updatedFields: Partial<JobFilterState>) => {
        setDebouncedFilters((prev) => ({
          ...prev,
          ...updatedFields,
        }));
      }, 500),
    []
  );

  const handleFilterChange = (key: keyof JobFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (["title", "location", "companyName"].includes(key)) {
      debouncedTextInputs({ [key]: value });
    } else {
      setDebouncedFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  useEffect(() => {
    return () => {
      debouncedTextInputs.cancel();
    };
  }, [debouncedTextInputs]);

  const {
    data: jobs = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["jobs", debouncedFilters],
    queryFn: async () => {
      const res = await getJobsApi(debouncedFilters);
      setTotalCount(res?.totalCount);
      return res?.data;
    },
  });

  const handleActiveClick = (id: string, active: boolean) => {
    show({
      title: "Confirmation",
      description: `Are you sure want to ${
        active ? "Deactive" : "Active"
      } this Job?`,
      confirmText: `${active ? "Deactivate" : "Activate"}`,
      onConfirm: async () => {
        await ToastMessage.promise(activeDeactiveJobApi(id), {
          loading: active ? "Deactivating Job..." : "Activating Job",
          success: active
            ? "Deactivated Successfully!"
            : "Activated Successfully!",
          error: "Failed to save action!!",
        });

        hide();
        refetch();
      },
      isNormal: active ? false : true,
    });
  };

  const handleDelete = async (id: string | number | undefined) => {
    show({
      title: "Delete Job",
      description: "Are you sure you want to delete this hjob?",
      confirmText: "Delete",
      onConfirm: async () => {
        await ToastMessage.promise(deleteJobApi(id), {
          loading: "Deleting Job.....",
          success: "Job deleted successfully!",
          error: "Failed to delete!!1",
        });
        refetch();
        hide();
      },
    });
  };

  const clearFilter = () => {
    setFilters({
      page: 0,
      title: "",
      location: "",
      companyName: "",
      date: "",
    });
    setDebouncedFilters({
      page: 0,
      title: "",
      location: "",
      companyName: "",
      date: "",
    });
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg font-medium">
        Failed to load jobs. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filter Inputs */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2 rounded-md">
          <input
            type="search"
            placeholder="Company Name"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Position"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
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
        <div>
          <button
            onClick={clearFilter}
            className="bg-[#0754AE] cursor-pointer text-white px-4 py-2 rounded-md  text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Jobs</h2>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          Download Excel
        </button> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] text-center w-full bg-white shadow-md rounded-md overflow-hidden text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 ">Company Name</th>
              <th className="px-4 py-2 ">Designation</th>
              <th className="px-4 py-2 ">Experience</th>
              <th className="px-4 py-2 ">Salary</th>
              <th className="px-4 py-2 ">No. of Vacancies</th>
              <th className="px-4 py-2 ">Location</th>
              <th className="px-4 py-2 ">Industry</th>
              <th className="px-4 py-2 ">Registration date</th>
              <th className="px-4 py-2 ">Last date</th>
              <th className="px-4 py-2 ">Active/Inactive</th>
              <th className="px-4 py-2 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={11}>
                  <TableLoader />
                </td>
              </tr>
            ) : jobs.length > 0 ? (
              jobs.map((item, i) => (
                <tr key={i} className="even:bg-gray-100">
                  <td className="px-4 py-2 ">{item.companyName || "-"}</td>
                  <td className="px-4 py-2 ">
                    <span
                      onClick={() => navigate(`/admin/stats/job/${item.id}`)}
                      className="font-semibold text-blue-800  cursor-pointer"
                    >
                      {item.title || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2 ">
                    {item.minExperience} - {item.maxExperience}
                  </td>
                  <td className="px-4 py-2  text-nowrap">
                    ₹{item.minSalary} - {item.maxSalary} /yr
                  </td>
                  <td className="px-4 py-2 ">
                    {item.numberOfVacancies || "-"}
                  </td>
                  <td className="px-4 py-2 ">{item.location || "-"}</td>
                  <td className="px-4 py-2 ">{item.industryType || "-"}</td>
                  <td className="px-4 py-2 ">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-2 ">{item.lastDate || "-"}</td>
                  <td className="px-4 py-2 ">
                    <label
                      onClick={() => handleActiveClick(item.id, item.active)}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.active}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </td>
                  <td className="px-4 py-2 ">
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 onClick={() => handleDelete(item.id)} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="py-8 text-gray-600">
                  No Entries found for given filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {jobs.length > 0 && (
        <div className="w-full flex justify-center items-center">
          <Pagination
            currentPage={filters.page}
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={(page) => {
  setFilters((prev) => ({ ...prev, page }));
  setDebouncedFilters((prev) => ({ ...prev, page })); 
}}

          />
        </div>
      )}
    </div>
  );
};

export default JobList;
