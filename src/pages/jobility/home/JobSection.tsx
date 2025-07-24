import SectionCard from "../../components/ui/card/SectionCard.tsx";
import React from "react";
import { getJobsApi } from "../../api/public/public.ts";
import { useQuery } from "@tanstack/react-query";
import type { JobCard } from "../../types/JobCard.ts";
import { AuthLoader } from "../../components/ui/loader/authLoader.tsx";

export const JobSection: React.FC = () => {
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

  return (
    <section className="bg-[#E4EDFF]">
      <div className="container py-10 px-2 mx-auto xl:px-30 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold">
            What are you looking for today?
          </h2>
          <h2 className="text-4xl font-bold text-[#0754AE]">Freshers Job</h2>
        </div>

        {isLoading ? (
          <div className="w-full md:h-[400px] flex justify-center items-center">
            <AuthLoader />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center items-center py-10">
            <p className="text-red-600 text-lg font-medium">
              Something went wrong while fetching jobs.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide py-4 px-2">
            <div className="flex gap-6 min-w-max">
              {jobs.length > 0 ? (
                jobs.map((job: JobCard, index) => (
                  <SectionCard key={index} data={job} isJob />
                ))
              ) : (
                <div>
                  <p className="text-gray-500 text-lg">
                    No jobs available at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
