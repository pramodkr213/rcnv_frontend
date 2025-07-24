import React, { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEmployerApi,
  getEmployerRequestApi,
  verifyEmployeeApi,
} from "../../../api/admin/admin";
import debounce from "lodash.debounce";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";
import { formatDate } from "../../../utils/helper";
import Pagination from "../../../components/Pagination";

export interface RequestsFilterState {
  page: number;
  name?: string;
  companyName?: string;
  location?: string;
  industryType?: string;
  date?: string;
}

const EmployerRequests: React.FC = () => {
  const { show, hide } = useActionModal();
  const actionModal = useActionModal();
  const queryClient = useQueryClient();
  const [inputFilters, setInputFilters] = useState<RequestsFilterState>({
    page: 0,
    name: "",
    companyName: "",
    location: "",
    industryType: "",
    date: "",
  });

  const [filters, setFilters] = useState<RequestsFilterState>(inputFilters);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Debounced setter using lodash.debounce
  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: RequestsFilterState) => {
        setFilters(newFilters);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSetFilters(inputFilters);
    // Cancel debounce on unmount
    return () => debouncedSetFilters.cancel();
  }, [inputFilters, debouncedSetFilters]);

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["employers", filters],
    queryFn: async () => {
      const res = await getEmployerRequestApi(filters);
      setTotalCount(res.totalCount);
      return res?.data;
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    const key = {
      "Company Name": "companyName",
      "First Name/ E-mail / Mobile No.": "name",
      "Enter City": "location",
      "Enter Industry": "industryType",
    }[placeholder] as keyof RequestsFilterState;

    setInputFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 0,
    }));
  };

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

  const handleVerifyClick = (id: number) => {
    show({
      title: "Verification Confirmation",
      description: `Are you sure want to verify this Employer?`,
      confirmText: `Verify`,
      onConfirm: async () => {
        await ToastMessage.promise(verifyEmployeeApi(id), {
          loading: `Verifying Employer...`,
          success: `Employer Verified!`,
          error: "Failed to save action!!",
        });

        hide();
        refetch();
      },
      isNormal: true,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteEmployerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employers"] });
      ToastMessage.success("Employer deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete Employer.");
    },
  });

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Employer",
      description: "Are you sure you want to delete this employer?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  return (
    <div className="p-4 min-h-screen space-y-6">
      {/* Filter Section */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2 rounded-md">
          <input
            type="search"
            placeholder="Company Name"
            value={inputFilters.companyName}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="First Name/ E-mail / Mobile No."
            value={inputFilters.name}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Enter City"
            value={inputFilters.location}
            onChange={handleChange}
            className="border p-2 rounded-md outline-none border-gray-300 focus:border-blue-500"
          />
          <input
            type="search"
            placeholder="Enter Industry"
            value={inputFilters.industryType}
            onChange={handleChange}
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

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total Employer Requests</h2>
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Download Excel
          </button> */}
        </div>

        <div className="overflow-auto bg-white rounded-md shadow-sm">
          <table className="min-w-[1000px] w-full text-sm text-center">
            <thead className="bg-blue-100 text-gray-800">
              <tr>
                <th className="px-4 py-2 ">Verify</th>
                <th className="px-4 py-2 ">Full Name</th>
                <th className="px-4 py-2 ">Posted Job</th>
                <th className="px-4 py-2 ">Posted Internship</th>
                <th className="px-4 py-2 ">Company Name</th>
                <th className="px-4 py-2 ">City</th>
                <th className="px-4 py-2 ">Industry</th>
                <th className="px-4 py-2 ">Email</th>
                <th className="px-4 py-2 ">Registration date</th>
                <th className="px-4 py-2 ">Delete</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((employer, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 ">
                    <label
                      onClick={() => handleVerifyClick(employer.id)}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={employer.verified}
                        readOnly
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:left-1 after:top-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </td>
                  <td className="px-4 py-2  ">
                    <span className="font-semibold text-blue-800 text-nowrap cursor-pointer">
                      {employer.firstName} {employer.lastName}
                    </span>
                  </td>
                  <td className="px-4 py-2 ">{employer.jobPostCount}</td>
                  <td className="px-4 py-2 ">{employer.internshipPostCount}</td>
                  <td className="px-4 py-2 ">{employer.companyName}</td>
                  <td className="px-4 py-2 ">{employer.city}</td>
                  <td className="px-4 py-2 ">{employer.industryType}</td>
                  <td className="px-4 py-2  whitespace-nowrap">
                    {employer.email}
                  </td>
                  <td className="px-4 py-2 ">
                    {formatDate(employer.createdAt)}
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
              ))}
            </tbody>
          </table>
        </div>
        {requests.length > 0 ? (
          <div className="w-full flex justify-center items-center">
            <Pagination
              currentPage={filters.page}
              totalPages={Math.ceil(totalCount / 10)}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center p-4">
            No Entries found for given filter
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerRequests;
