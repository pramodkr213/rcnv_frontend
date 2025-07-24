import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../../api/employer/employer.ts";
import { getDecryptedAuthCookie } from "../../../utils/cookieCrypto.ts";
import StatsCard from "../../../components/StatsCard.tsx";

const Dashboard: React.FC = () => {
  const user = getDecryptedAuthCookie();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/", { replace: true });
    } else if (user?.role === "EMPLOYER" && !user?.isEmailVerified) {
      navigate("/registration/employer/verify-email", { replace: true });
    } else if (user?.role === "EMPLOYER" && !user?.hasCompany) {
      navigate("/registration/employer/organization", { replace: true });
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await getDashboard();
      return res?.data;
    },
  });

  const cards = [
    {
      title: "Total jobs posted by you",
      count: data?.totalJobs || 0,
      buttonText: "View Jobs",
      onclick: () => navigate("/employer/my-jobs"),
    },
    {
      title: "Total internships posted by you",
      count: data?.totalInternships || 0,
      buttonText: "View Internships",
      onclick: () => navigate("/employer/my-internships"),
    },
    {
      title: "Latest Walkings",
      count: 0,
      buttonText: "View Latest Walkings",
      onclick: () => {},
    },
    {
      title: "Job Applications",
      count: data?.totalJobs,
      buttonText: "View Job Applications",
      onclick: () => {},
    },
  ];

  return (
    <>
      <div className="flex-1 bg-[#f6f8fc] p-6 w-full overflow-y-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-6">
          {cards.map((card, index) => {
            return (
              <StatsCard
                key={index}
                title={card.title}
                count={card.count}
                buttonText={card.buttonText}
                onClick={card.onclick}
              />
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6 bg-[#F7FAFF]">
          {/* Left Section: Saved Folder */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Saved Folder */}
            <div>
              <h2 className="text-md font-semibold mb-2 text-start pl-2">
                Saved Folder
              </h2>
              <div className="bg-white border rounded-md p-4 text-sm text-gray-300 h-56">
                Short listed Candidates
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div>
              <h2 className="text-md font-semibold mb-2 text-start pl-2">
                Upcoming Interviews
              </h2>
              <div className="bg-white border rounded-md p-4 text-sm text-gray-300 h-56">
                No upcoming interview
              </div>
            </div>
          </div>

          {/* Right Section: Info Box */}
          <div className="bg-[#E1F3FF] p-4 rounded-md h-[250px] flex flex-col justify-start ">
            {/* Last Date */}
            <div className="bg-white rounded-sm text-start px-3 py-2 mb-4">
              <div className="text-sm text-gray-600">Last Date:</div>
              <div className="font-semibold">26/03/2025</div>
            </div>

            {/* No. of Resume */}
            <div className="bg-white rounded-sm text-start px-3 py-2 mb-4">
              <div className="text-sm text-gray-600">No. of Resume:</div>
              <div className="font-semibold">15</div>
            </div>

            {/* Total Resume View */}
            <div className="bg-white rounded-sm text-start px-3 py-2">
              <div className="text-sm text-gray-600">Total Resume View:</div>
              <div className="font-semibold">15</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
