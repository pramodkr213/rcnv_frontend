import React, { useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  activeDeactiveEmployeeApi,
  deleteEmployerApi,
  getEmployersApi,
} from "../../../api/admin/admin";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/loader/TableLoader";

export interface EmployerFilterState {
  page: number;
  name?: string;
  companyName?: string;
  location?: string;
  industryType?: string;
  date?: string;
}

const EmployerList: React.FC = () => {
  const { hide, show } = useActionModal();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [inputFilters, setInputFilters] = useState<EmployerFilterState>({
    page: 0,
    name: "",
    companyName: "",
    location: "",
    industryType: "",
    date: "",
  });

  const [filters, setFilters] = useState<EmployerFilterState>({
    page: 0,
    name: "",
    companyName: "",
    location: "",
    industryType: "",
    date: "",
  });

  // Debounce filter updates (except page)
  const debouncedUpdateFilters = useMemo(
    () =>
      debounce((updated) => {
        setFilters((prev) => ({
          ...prev,
          ...updated,
          page: 0, // reset to first page on filter change
        }));
      }, 500),
    []
  );

  const handleInputChange = (key: keyof EmployerFilterState, value: string) => {
    const updated = { ...inputFilters, [key]: value };
    setInputFilters(updated);
    debouncedUpdateFilters({ [key]: value });
  };

  const {
    data: employers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employers", filters],
    queryFn: async () => {
      const res = await getEmployersApi(filters);
      setTotalCount(res?.totalCount);
      return res?.employeeData;
    },
  });

  const clearFilter = () => {
    const cleared = {
      page: 0,
      name: "",
      companyName: "",
      location: "",
      industryType: "",
      date: "",
    };
    setInputFilters(cleared);
    setFilters(cleared);
  };

  const handleActiveClick = (id: number, active: boolean) => {
    show({
      title: "Confirmation",
      description: `Are you sure want to ${
        active ? "Deactive" : "Active"
      } this Employer?`,
      confirmText: `${active ? "Deactivate" : "Activate"}`,
      onConfirm: async () => {
        await ToastMessage.promise(activeDeactiveEmployeeApi(id), {
          loading: active ? "Deactivating Employer..." : "Activating Employer",
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
      title: "Delete Employer",
      description: "Are you sure you want to delete this employer?",
      confirmText: "Delete",
      onConfirm: async () => {
        await ToastMessage.promise(deleteEmployerApi(id), {
          loading: "Deleting Employer.....",
          success: "Employer deleted successfully!",
          error: "failed to delete!!",
        });
        refetch();
        hide();
      },
    });
  };

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg font-medium">
        Failed to load jobs. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filter Section */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4  py-2 rounded-md ">
          <input
            type="search"
            placeholder="First Name/ E-mail / Mobile No."
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
            value={inputFilters.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="search"
            placeholder="Company Name"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
            value={inputFilters.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
          />
          <input
            type="search"
            placeholder="Enter City"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
            value={inputFilters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
          <input
            type="search"
            placeholder="Enter Industry"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
            value={inputFilters.industryType}
            onChange={(e) => handleInputChange("industryType", e.target.value)}
          />
          <input
            type="date"
            placeholder="Registration Date"
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
            value={inputFilters.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
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

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total Employers</h2>
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Download Excel
          </button> */}
        </div>

        <div className="overflow-auto bg-white rounded-md">
          <table className="min-w-[1000px] w-full text-sm text-center ">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-4 py-2 ">Full Name</th>
                <th className="px-4 py-2 ">Posted Job</th>
                <th className="px-4 py-2 ">Posted Internship</th>
                <th className="px-4 py-2 ">Company Name</th>
                <th className="px-4 py-2 ">City</th>
                <th className="px-4 py-2 ">Industry</th>
                <th className="px-4 py-2 ">Email</th>
                <th className="px-4 py-2 ">Registration date</th>
                <th className="px-4 py-2 ">Active / Deactive</th>
                <th className="px-4 py-2 ">Delete</th>
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
                employers?.map((employer, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="px-4 py-2  ">
                      <span className="font-semibold text-blue-800 text-nowrap cursor-pointer">
                        {employer.firstname || "-"} {employer.lastname || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-2 ">{employer.jobpostcount}</td>
                    <td className="px-4 py-2 ">
                      {employer.internshippostcount}
                    </td>
                    <td className="px-4 py-2 ">
                      {employer.companyname || "-"}
                    </td>
                    <td className="px-4 py-2 ">{employer.city || "-"}</td>
                    <td className="px-4 py-2 ">
                      {employer.industrytype || "-"}
                    </td>
                    <td className="px-4 py-2  whitespace-nowrap">
                      {employer.email || "-"}
                    </td>
                    <td className="px-4 py-2 ">
                      {formatDate(employer.createdAt)}
                    </td>
                    <td className="px-4 py-2 ">
                      <label
                        onClick={() =>
                          handleActiveClick(employer.id, employer.active)
                        }
                        className="inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={employer.active}
                          readOnly
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                      </label>
                    </td>
                    <td className="px-4 py-2  text-center">
                      <button
                        onClick={() => handleDelete(employer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {employers.length > 0 ? (
          <div className="w-full flex justify-center items-center">
            <Pagination
              currentPage={filters.page}
              totalPages={Math.ceil(totalCount / 10)}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            No Entries found for given filter
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerList;
