import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Bookmark,
  User,
  FileText,
  TrendingUp,
  Calendar,
  MapPin,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
} from "lucide-react";
import {
  getStudentDashboardApi,
  getStudentApplicationsApi,
  getStudentBookmarksApi,
} from "../../../api/student/student";
import type {
  StudentDashboardResponse,
  ApplicationItem,
  BookmarkItem,
} from "../../../api/student/response/SuccessResponse";
import { formatDate } from "../../../utils/helper";
import { useAuth } from "../../../context/jobility/AuthContext";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: async () => {
      const res = await getStudentDashboardApi();
      return res.data;
    },
  });

  // Fetch applications data
  const { data: applicationsData, isLoading: applicationsLoading } = useQuery({
    queryKey: ["student-applications"],
    queryFn: async () => {
      const res = await getStudentApplicationsApi();
      return res.data;
    },
  });

  // Fetch bookmarks data
  const { data: bookmarksData, isLoading: bookmarksLoading } = useQuery({
    queryKey: ["student-bookmarks"],
    queryFn: async () => {
      const res = await getStudentBookmarksApi();
      return res.data;
    },
  });

  // Mock data for demonstration (replace with actual API data)
  const mockDashboardData = {
    totalApplications: 12,
    totalBookmarks: 8,
    profileCompletion: 85,
    recentApplications: [
      {
        id: "1",
        type: "job" as const,
        title: "Frontend Developer",
        company: "Tech Corp",
        status: "pending" as const,
        appliedDate: "2024-01-15",
        location: "Mumbai",
        salary: "₹8-12 LPA",
      },
      {
        id: "2",
        type: "internship" as const,
        title: "React Intern",
        company: "StartupXYZ",
        status: "shortlisted" as const,
        appliedDate: "2024-01-10",
        location: "Bangalore",
        stipend: "₹25,000/month",
      },
    ],
    recentBookmarks: [
      {
        id: "1",
        type: "job" as const,
        title: "Full Stack Developer",
        company: "BigTech Inc",
        location: "Delhi",
        salary: "₹12-18 LPA",
        bookmarkedDate: "2024-01-12",
      },
      {
        id: "2",
        type: "internship" as const,
        title: "Data Science Intern",
        company: "AI Solutions",
        location: "Pune",
        stipend: "₹30,000/month",
        bookmarkedDate: "2024-01-08",
      },
    ],
    profileStats: {
      profileCompletion: 85,
      resumeUploaded: true,
      educationCount: 3,
      skillsCount: 8,
      lastUpdated: "2024-01-10",
    },
  };

  const data = dashboardData || mockDashboardData;
  const applications = applicationsData || mockDashboardData.recentApplications;
  const bookmarks = bookmarksData || mockDashboardData.recentBookmarks;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "selected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "shortlisted":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected":
        return "text-green-600 bg-green-100";
      case "shortlisted":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  const stats = [
    {
      count: data.totalApplications,
      label: "Total Applications",
      icon: <Briefcase className="text-blue-600 w-6 h-6" />,
      color: "border-blue-500 bg-blue-50",
      navigateTo: "/candidate/applications",
    },
    {
      count: data.totalBookmarks,
      label: "My Bookmarks",
      icon: <Bookmark className="text-purple-600 w-6 h-6" />,
      color: "border-purple-500 bg-purple-50",
      navigateTo: "/candidate/bookmarks",
    },
    {
      count: `${data.profileCompletion}%`,
      label: "Profile Completion",
      icon: <User className="text-green-600 w-6 h-6" />,
      color: "border-green-500 bg-green-50",
      navigateTo: "/candidate/profile",
    },
    {
      count: data.profileStats.educationCount,
      label: "Education Records",
      icon: <FileText className="text-orange-600 w-6 h-6" />,
      color: "border-orange-500 bg-orange-50",
      navigateTo: "/candidate/profile",
    },
  ];

  if (dashboardLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back,{" "}
          <span className="text-blue-600">
            {auth?.user?.email?.split("@")[0].toUpperCase()}! 👋
          </span>
        </h1>
        <p className="text-gray-600">
          Track your job applications, bookmarks, and profile progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(stat.navigateTo)}
            className={`group cursor-pointer rounded-xl shadow-sm border-l-4 ${stat.color} p-6 hover:shadow-md transition-all duration-200 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-white shadow-sm">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stat.count}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Applications
              </h2>
              <button
                onClick={() => navigate("/student/applications")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>

            {applicationsLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.slice(0, 5).map((app: ApplicationItem) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800">
                            {app.title}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            {app.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {app.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {app.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied: {formatDate(app.appliedDate)}
                          </div>
                          {app.salary && (
                            <span className="text-green-600 font-medium">
                              {app.salary}
                            </span>
                          )}
                          {app.stipend && (
                            <span className="text-green-600 font-medium">
                              {app.stipend}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No applications yet</p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Browse jobs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookmarks */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                My Bookmarks
              </h2>
              <button
                onClick={() => navigate("/student/bookmarks")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>

            {bookmarksLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : bookmarks.length > 0 ? (
              <div className="space-y-4">
                {bookmarks.slice(0, 3).map((bookmark: BookmarkItem) => (
                  <div
                    key={bookmark.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {bookmark.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {bookmark.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Building className="w-4 h-4" />
                        {bookmark.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {bookmark.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {bookmark.salary && (
                        <span className="text-green-600 font-medium text-sm">
                          {bookmark.salary}
                        </span>
                      )}
                      {bookmark.stipend && (
                        <span className="text-green-600 font-medium text-sm">
                          {bookmark.stipend}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(bookmark.bookmarkedDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No bookmarks yet</p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Browse jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Completion Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Completion
          </h2>
          <button
            onClick={() => navigate("/student/profile")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Complete Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <svg
                className="w-20 h-20 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${data.profileCompletion}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">
                  {data.profileCompletion}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Overall Completion</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              {data.profileStats.resumeUploaded ? (
                <FileText className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {data.profileStats.resumeUploaded
                ? "Resume Uploaded"
                : "Resume Missing"}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">
              {data.profileStats.educationCount} Education Records
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">
              {data.profileStats.skillsCount} Skills Added
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
