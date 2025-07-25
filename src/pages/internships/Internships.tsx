import React, { lazy, Suspense } from "react";
import { InternshipFilterBar } from "./InternshipFilterBar.tsx";

import { useQuery } from "@tanstack/react-query";
import { getInternshipsApi } from "../../api/public/public.ts";
import type { InternshipCard } from "../../types/InternshipCard.ts";

import InternshipSidebarFilter from "../../components/InternshipSidebarFilter.tsx";
import { AuthLoader } from "../../components/loader/authLoader.tsx";
import { Loader } from "../../components/loader/Loader.tsx";
import Pagination from "../../components/Pagination.tsx";
import { useInternshipFilterContext } from "../../context/jobility/InternshipFilterContext.tsx";
import type { InternshipFilterState } from "../admin/internshiplist/InternshipList.tsx";

const JobInternCard = lazy(() => import("../../components/JobInternCard.tsx"));

const Internships: React.FC = () => {
  const { filters, setFilters } = useInternshipFilterContext();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["internships", filters],
    queryFn: async () => {
      const res = await getInternshipsApi(filters);
      return res?.data;
    },
  });

  const onFilter = (filters: InternshipFilterState) => {
    console.log(filters);
  };




  
  return (
    <section>
      <div className="mb-6 hidden lg:block">
        <InternshipFilterBar onFilter={onFilter} />
      </div>

      <section className="container my-5 mx-auto flex flex-col xl:px-30 md:flex-row gap-6">
        {/* Sidebar */}
        <div className="hidden lg:inline w-full lg:w-[20%]">
          <InternshipSidebarFilter onFilter={onFilter} />
        </div>

        {/* Job listings */}
        <div className="flex-1 flex flex-col items-center lg:items-start px-5 lg:px-0 gap-5 overflow-y-auto scrollbar-hide">
          <div className="flex flex-wrap items-start justify-between gap-4 px-2">
            <p className="text-xl sm:text-2xl font-bold">
              Recommended Internships
            </p>
            <p className="px-4 py-1 text-sm rounded-full border border-gray-300">
              {data.length} internships
            </p>
          </div>

          {isLoading ? (
            <div className="flex w-full h-full justify-center items-center">
              <AuthLoader />
            </div>
          ) : isError ? (
            <div className="flex w-full h-full justify-center items-center">
              <p className=" text-red-500 mt-10">
                Failed to load internships. Please try again.
              </p>
            </div>
          ) : (
            <Suspense fallback={<Loader />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {data.length > 0 ? (
                  data.map((internship: InternshipCard, index: number) => (
                    <JobInternCard key={index} data={internship} />
                  ))
                ) : (
                  <div className="flex col-span-full w-full h-full justify-center items-center">
                    <p className=" text-center text-gray-500 mt-10">
                      No internships match the current filters.
                    </p>
                  </div>
                )}
              </div>
            </Suspense>
          )}
          {data.length > 0 && (
            <div className="w-full flex justify-center items-center ">
              <Pagination
                currentPage={filters.page}
                totalPages={Math.ceil(data.length / 10)}
                onPageChange={(page) =>
                  setFilters(() => ({ ...filters, page }))
                }
              />
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Internships;
