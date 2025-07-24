import SectionCard from "../../components/ui/card/SectionCard.tsx";
import React from "react";
import type { InternshipCard } from "../../types/InternshipCard.ts";
import { getInternshipsApi } from "../../api/public/public.ts";
import { useQuery } from "@tanstack/react-query";
import { AuthLoader } from "../../components/ui/loader/authLoader.tsx";

export const InternshipSection: React.FC = () => {
  const {
    data: internships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      const res = await getInternshipsApi();
      return res?.data;
    },
  });

  return (
    <section className="bg-[#E4EDFF]">
      <div className="container py-10 mx-auto xl:px-30 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-[#0754AE]">Internships</h2>
        </div>

        {isLoading ? (
          <div className="w-full md:h-[400px] flex justify-center items-center">
            <AuthLoader />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center items-center py-10">
            <p className="text-red-600 text-lg font-medium">
              Failed to load internships. Please try again later.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide py-4 px-2">
            <div className="flex gap-6 min-w-max">
              {internships.length > 0 ? (
                internships.map((internship: InternshipCard, index) => (
                  <SectionCard key={index} data={internship} isJob={false} />
                ))
              ) : (
                <p className="text-gray-500 text-lg">
                  No internships available at the moment.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
