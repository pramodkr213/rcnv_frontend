import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  activeDeactiveCandidateApi,
  deleteCandidateApi,
  getStudentsApi,
} from "../../../api/admin/admin";
import { Download, Trash2 } from "lucide-react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";
import { educationOptions } from "../../../data/EducationData";
import TableLoader from "../../../components/loader/TableLoader";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";

export interface CandidateFilterState {
  page: number;
  name?: string;
  location?: string;
  date?: string;
  degree?: string;
  fieldOfStudy?: string;
  yearOfPassing?: string;
  college?: string;
}

const CandidatesList: React.FC = () => {
  const { show, hide } = useActionModal();
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState<number>(0);

  // All filters in one state
  const [filters, setFilters] = useState<CandidateFilterState>({
    page: 0,
    name: "",
    location: "",
    date: "",
    degree: "",
    fieldOfStudy: "",
    yearOfPassing: "",
    college: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 35 }, (_, i) => currentYear - 30 + i);

  const [debouncedFilters, setDebouncedFilters] =
    useState<CandidateFilterState>(filters);

  const debounceFilterChange = useCallback(
    debounce((newFilters: CandidateFilterState) => {
      setDebouncedFilters(newFilters);
    }, 500),
    []
  );

  useEffect(() => {
    debounceFilterChange(filters);
  }, [filters, debounceFilterChange]);

  const {
    data: candidates = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["candidates", debouncedFilters],
    queryFn: async () => {
      const res = await getStudentsApi(debouncedFilters);
      setTotalCount(res.totalCount);
      return res?.studentData;
    },
  });

  // Generic input/select change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If degree changes, reset fieldOfStudy
    if (name === "degree") {
      setFilters((prev) => ({
        ...prev,
        degree: value,
        fieldOfStudy: "",
        page: 0,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        page: 0,
      }));
    }
  };

  const clearFilter = () => {
    setFilters({
      page: 0,
      name: "",
      location: "",
      date: "",
      degree: "",
      fieldOfStudy: "",
      yearOfPassing: "",
      college: "",
    });
  };

  const handleActiveClick = (id: number, active: boolean) => {
    show({
      title: "Confirmation",
      description: `Are you sure want to ${
        active ? "Deactivate" : "Activate"
      } this Candidate?`,
      confirmText: `${active ? "Deactivate" : "Activate"}`,
      onConfirm: async () => {
        await ToastMessage.promise(activeDeactiveCandidateApi(id), {
          loading: active ? "Deactivating..." : "Activating...",
          success: active
            ? "Deactivated successfully!"
            : "Activated successfully!",
          error: "Failed to save action!!!",
        });

        hide();
        refetch();
      },
      isNormal: !active,
    });
  };

  const handleDownload = (resumeUrl: string) => {
    if (resumeUrl) window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (id: string | number | undefined) => {
    show({
      title: "Delete Candidate",
      description: "Are you sure you want to delete this candidate?",
      confirmText: "Delete",
      onConfirm: async () => {
        await ToastMessage.promise(deleteCandidateApi(id), {
          loading: "Deleting Candidate.....",
          success: "Candidate deleted successfully!",
          error: "Failed to delete candidate!!!",
        });
        refetch();
        hide();
      },
    });
  };

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filters */}
      <div className="rounded-md py-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="search"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Name / Mobile / Email"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Enter City"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          {/* Degree */}
          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="degree"
            value={filters.degree}
            onChange={handleInputChange}
          >
            <option value="">Select Degree</option>
            {educationOptions.map((edu) => (
              <option key={edu.degree} value={edu.degree}>
                {edu.degree}
              </option>
            ))}
          </select>

          {/* Branch */}
          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="fieldOfStudy"
            value={filters.fieldOfStudy}
            onChange={handleInputChange}
            disabled={!filters.degree}
          >
            <option value="">Select Branch</option>
            {educationOptions
              .find((e) => e.degree === filters.degree)
              ?.branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
          </select>

          {/* Year of Passing */}
          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="yearOfPassing"
            value={filters.yearOfPassing}
            onChange={handleInputChange}
          >
            <option value="">Select Year of Passing</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <input
            type="search"
            name="college"
            value={filters.college}
            onChange={handleInputChange}
            placeholder="College Name"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            onClick={clearFilter}
            className="bg-[#0754AE] cursor-pointer text-white px-4 py-2 rounded-md text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Table Header and Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Candidates</h2>
      </div>

      {/* Responsive Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm text-center bg-white rounded-md">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Mob. No.</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Resume</th>
              <th className="px-4 py-2">Registration date</th>
              <th className="px-4 py-2">Last Login date</th>
              <th className="px-4 py-2">Active/Inactive</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9}>
                  <TableLoader />
                </td>
              </tr>
            ) : candidates?.length > 0 ? (
              candidates?.map((item, i) => (
                <tr key={i} className="even:bg-gray-100">
                  <td className="px-4 py-2">
                    <span
                      onClick={() =>
                        navigate(`/admin/stats/candidates/detail/${item.id}`)
                      }
                      className="font-semibold text-blue-800 cursor-pointer"
                    >
                      {item.firstName || "-"} {item.lastName || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.phone || "-"}</td>
                  <td className="px-4 py-2">{item.email || "-"}</td>
                  <td className="px-4 py-2">{item.city || "-"}</td>
                  <td className="px-4 py-2 text-blue-600 text-lg">
                    <button
                      onClick={() => handleDownload(item.resumeLink)}
                      className="hover:text-blue-700"
                    >
                      <Download />
                    </button>
                  </td>
                  <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-2">12/06/2025</td>
                  <td className="px-4 py-2">
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
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-4">
                  No Entries found for given filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {candidates.length > 0 && (
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

export default CandidatesList;
