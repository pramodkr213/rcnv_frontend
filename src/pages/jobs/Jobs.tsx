import React, { lazy, Suspense } from "react";
import { JobFilterBar } from "./JobFilterBar.js";
import { useQuery } from "@tanstack/react-query";
import type { JobCard } from "../../types/JobCard.ts";

import JobSidebarFilter from "../../components/JobSidebarFilter.tsx";
import { AuthLoader } from "../../components/loader/authLoader.tsx";
import { Loader } from "lucide-react";
import Pagination from "../../components/Pagination.tsx";
import { getJobsApi } from "../../api/public/public.ts";
import { useJobFilterContext } from "../../context/jobility/JobFilterContext.tsx";
import type { JobFilterState } from "../admin/joblist/JobList.tsx";

const JobInternCard = lazy(() => import("../../components/JobInternCard.tsx"));

const Jobs: React.FC = () => {
  const { filters, setFilters } = useJobFilterContext();

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const res = await getJobsApi(filters);
      return res?.data;
    },
  });

  const onFilter = (filters: JobFilterState) => {
    console.log(filters);
  };

  return (
    <section>
      <div className="mb-6 hidden lg:block">
        <JobFilterBar onFilter={onFilter} />
      </div>

      <section className="container my-5 mx-auto flex flex-col 2xl:px-30 md:flex-row gap-6">
        {/* Sidebar */}
        <div className="hidden lg:inline w-full lg:w-[20%]">
          <JobSidebarFilter onFilter={onFilter} />
        </div>

        {/* Job listings */}
        <div className="flex-1 flex flex-col items-center lg:items-start px-5 lg:px-0 gap-5 overflow-y-auto scrollbar-hide">
          <div className="flex flex-wrap items-start justify-between gap-4 px-2">
            <p className="text-xl sm:text-2xl font-bold">Recommended Jobs</p>
            <p className="px-4 py-1 text-sm rounded-full border border-gray-300">
              {jobs.length} jobs
            </p>
          </div>

          {isLoading ? (
            <div className="flex w-full h-full justify-center items-center">
              <AuthLoader />
            </div>
          ) : isError ? (
            <div className="flex w-full h-full justify-center items-center">
              <p className=" text-red-500 mt-10">
                Failed to load jobs. Please try again.
              </p>
            </div>
          ) : (
            <Suspense fallback={<Loader />}>
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {jobs.map((job: JobCard, index: number) => (
                    <JobInternCard key={index} data={job} isJob />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-40">
                  <p className="text-center text-gray-500">
                    No jobs match the current filters.
                  </p>
                </div>
              )}
            </Suspense>
          )}
          {jobs.length > 0 && (
            <div className="w-full flex justify-center items-center ">
              <Pagination
                currentPage={filters.page}
                totalPages={Math.ceil(jobs.length / 10)}
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

export default Jobs;
