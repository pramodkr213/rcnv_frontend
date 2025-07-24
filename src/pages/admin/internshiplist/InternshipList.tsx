import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

import {
  activeDeactiveInternshipApi,
  deleteInternshipApi,
  getInternshipsApi,
} from "../../../api/admin/admin";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";
import TableLoader from "../../../components/loader/TableLoader";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";

export interface InternshipFilterState {
  page: number;
  title?: string;
  location?: string;
  companyName?: string;
  date?: string;
}

const InternshipList: React.FC = () => {
  const navigate = useNavigate();
  const { show, hide } = useActionModal();
  const [totalCount, setTotalCount] = useState<number>(0);
  // Filters state including page
  const [filters, setFilters] = useState<InternshipFilterState>({
    page: 0,
    title: "",
    location: "",
    companyName: "",
    date: "",
  });

  // Debounce filters except page
  const [debouncedFilters] = useDebounce(
    {
      title: filters.title,
      location: filters.location,
      companyName: filters.companyName,
      date: filters.date,
    },
    500
  );

  // Query with debounced filters + current page
  const {
    data: internships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["internships", debouncedFilters, filters.page],
    queryFn: async () => {
      const queryFilters = { ...debouncedFilters, page: filters.page };
      const res = await getInternshipsApi(queryFilters);
      setTotalCount(res.totalCount);
      return res?.data;
    },
  });

  // Update filters (except page)
  const updateFilter = (
    key: keyof Omit<InternshipFilterState, "page">,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Pagination handler
  const onPageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleActiveClick = (id: string, active: boolean) => {
    show({
      title: "Confirmation",
      description: `Are you sure want to ${
        active ? "Deactive" : "Active"
      } this Internship?`,
      confirmText: `${active ? "Deactivate" : "Activate"}`,
      onConfirm: async () => {
        await ToastMessage.promise(activeDeactiveInternshipApi(id), {
          loading: active
            ? "Deactivating Internship..."
            : "Activating Internship",
          success: active
            ? "Deactivated Successfully!"
            : "Activated Successfully!",
          error: "failed to save action!!",
        });

        hide();
        refetch();
      },
      isNormal: active ? false : true,
    });
  };

  const handleDelete = async (id: string | number | undefined) => {
    show({
      title: "Delete Internship",
      description: "Are you sure you want to delete this internship?",
      confirmText: "Delete",
      onConfirm: async () => {
        await ToastMessage.promise(deleteInternshipApi(id), {
          loading: "Deleting Internship.....",
          success: "Internship deleted successfully!",
          error: "Failed to delete!!!",
        });
        refetch();
        hide();
      },
    });
  };

  // Clear all filters except page (set page to 1)
  const clearFilter = () => {
    setFilters({
      page: 0,
      title: "",
      companyName: "",
      location: "",
      date: "",
    });
  };

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filter Inputs */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
          <input
            type="search"
            placeholder="Company Name"
            value={filters.companyName}
            onChange={(e) => updateFilter("companyName", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => updateFilter("date", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Position"
            value={filters.title}
            onChange={(e) => updateFilter("title", e.target.value)}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
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

      {/* Table Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Total Internships</h2>
        {/* <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm">
          Download Excel
        </button> */}
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-[1000px] text-center w-full bg-white shadow-md rounded-md overflow-hidden text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Stipend</th>
              <th className="px-4 py-2">No. of Vacancies</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Internship Type</th>
              <th className="px-4 py-2">Registration date</th>
              <th className="px-4 py-2">Last date</th>
              <th className="px-4 py-2">Active/Inactive</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={10}>
                  <TableLoader />
                </td>
              </tr>
            ) : (
              internships?.map((item, i) => (
                <tr key={i} className="even:bg-gray-100">
                  <td className="px-4 py-2">{item.companyName || "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      onClick={() =>
                        navigate(`/admin/stats/internship/${item.id}`)
                      }
                      className="font-semibold text-blue-800  cursor-pointer"
                    >
                      {item.title || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {item.isPaid ? (
                      <span>
                        ₹{item.minStipend} - {item.maxStipend} /mon
                      </span>
                    ) : (
                      <span>Unpaid</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{item.numberOfOpenings || "-"}</td>
                  <td className="px-4 py-2">{item.location || "-"}</td>
                  <td className="px-4 py-2">{item.internshipType || "-"}</td>
                  <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-2">
                    {item.applicationDeadline || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <label
                      onClick={() => handleActiveClick(item.id, item.isActive)}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 onClick={() => handleDelete(item.id)} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {internships.length > 0 ? (
        <div className="w-full flex justify-center items-center">
          <Pagination
            currentPage={filters.page}
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          No Entries found for given filter
        </div>
      )}
    </div>
  );
};

export default InternshipList;
