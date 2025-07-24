import React from "react";
import {
  Briefcase,
  Users,
  ClipboardList,
  School,
  UserCheck,
  GraduationCap,
  SquareChartGantt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "../../../api/admin/admin";
import RecentlyPostedJobs from "./RecentlyPostedJobs";
import RecentlyHiredCandidates from "./RecentlyHiredCandidates";
import RecentlyPostedInternships from "./RecentlyPostedInternships";

const Dashboard: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await getDashboardApi();
      return res.data;
    },
  });

  const navigate = useNavigate();

  const stats = [
    {
      count: data?.totalJobs || 0,
      label: "Total Jobs",
      icon: <Briefcase className="text-blue-600 w-5 h-5" />,
      color: "border-blue-500 bg-blue-100",
      navigateTo: "/admin/jobs-list",
    },
    {
      count: data?.totalInternships || 0,
      label: "Total Internships",
      icon: <School className="text-pink-600 w-5 h-5" />,
      color: "border-pink-500 bg-pink-100",
      navigateTo: "/admin/internships-list",
    },
    {
      count: data?.totalStudents || 0,
      label: "Total Candidates",
      icon: <GraduationCap className="text-orange-600 w-5 h-5" />,
      color: "border-orange-500 bg-orange-100",
      navigateTo: "/admin/candidates-list",
    },
    {
      count: data?.totalEmployers || 0,
      label: "Total Employers",
      icon: <Users className="text-purple-600 w-5 h-5" />,
      color: "border-purple-500 bg-purple-100",
      navigateTo: "/admin/employers",
    },
    {
      count: data?.totalApplications || 0,
      label: "Job Applications",
      icon: <ClipboardList className="text-cyan-600 w-5 h-5" />,
      color: "border-cyan-500 bg-cyan-100",
      navigateTo: "/admin/job-applications",
    },
    {
      count: data?.totalApplications || 0,
      label: "Internship Applications",
      icon: <SquareChartGantt className="text-red-600 w-5 h-5" />,
      color: "border-red-500 bg-red-100",
      navigateTo: "/admin/internships-list",
    },
    {
      count: data?.totalPendingEmployerRequests || 0,
      label: "Employer Requests",
      icon: <UserCheck className="text-green-600 w-5 h-5" />,
      color: "border-green-500 bg-green-100",
      navigateTo: "/admin/employer-requests",
    },
  ];

  return (
    <div className="p-6 min-h-screen rounded-md ">
      {/* Welcome Header */}
      <div className="mb-6 text-gray-700">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, <span className="text-blue-600">Admin! 👋</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening in your job portal today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(stat.navigateTo)}
            className={`group cursor-pointer rounded-xl shadow transition-all hover:scale-[1.03] hover:shadow-lg border-b-4 ${stat.color} p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-gray-800">
                {stat.count.toLocaleString()}
              </div>
            </div>
            <div className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recently Posted Jobs */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-4">
        <div className="">
          <div className="mb-6">
            <RecentlyHiredCandidates />
          </div>
          <div>
            <RecentlyPostedInternships />
          </div>
        </div>
        <div>
          <RecentlyPostedJobs />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
