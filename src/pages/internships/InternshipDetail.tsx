import React from "react";
import {
  FaMapMarkerAlt,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGift,
  FaShareAlt,
} from "react-icons/fa";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getInternshipByIdApi } from "../../api/public/public.ts";
import { formatDate } from "../../utils/helper.ts";
import toast from "react-hot-toast";
import { applyInternshipApi } from "../../api/student/student.ts";
import { getDecryptedAuthCookie } from "../../utils/cookieCrypto.ts";
import { useAuth } from "../../context/jobility/AuthContext.tsx";
import { AuthLoader } from "../../components/loader/authLoader.tsx";
import { ToastMessage } from "../../utils/toast.ts";

const InternshipDetail: React.FC = () => {
  const { id } = useParams();
  const user = getDecryptedAuthCookie();
  const { setIsLoginModalOpen } = useAuth();

  const { data, isLoading, isError, refetch } = useSuspenseQuery({
    queryKey: ["internship", id],
    queryFn: async () => {
      const res = await getInternshipByIdApi(id);
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <AuthLoader />
      </div>
    );
  }

  const handleApplyClick = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      toast("You need to be logged in to apply for a job");
      return;
    }

    if (user?.role !== "STUDENT") {
      toast("You need to be logged in as student to apply for a job");
      return;
    }

    await ToastMessage.promise(applyInternshipApi(id), {
      loading: "Applying...",
      success: "Application submitted successfully!",
      error: "failed to apply",
    });

    refetch();
  };

  if (isError) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-red-500 mt-10">
          Failed to load internship. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-10 px-4 md:px-20">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        {data?.title} Internship
      </h1>

      <div className="relative bg-white p-6 border border-gray-300 rounded-lg max-w-5xl mx-auto">
        {/* Top Section: Job Header and Quick Info */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Side - Job Basic Info + About */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold">
                {data?.title} Internship{" "}
                <span className="text-sm bg-gray-100 px-2 py-1 rounded ml-2">
                  {data.numberOfApplications} Applicants
                </span>
              </h2>
              <p className="text-gray-600">{data?.employer?.companyName}</p>
              <div className="flex items-center text-gray-500 mt-1">
                <FaMapMarkerAlt className="mr-1" /> {data?.location}
              </div>
            </div>

            {/* About the Job - Lifted Up */}
            <section>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              {data?.internshipDescription && (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: data?.internshipDescription,
                  }}
                />
              )}
            </section>
          </div>

          {/* Right Info Card (Desktop only) */}
          <div className="hidden lg:block w-72">
            <div className="bg-white p-4 rounded-lg space-y-4 h-fit border  border-gray-200">
              {/* Experience */}
              <div className="flex items-center gap-2 rounded-full border border-gray-300 text-sm">
                <div className="flex items-center space-x-2 bg-blue-100 font-medium px-3 py-1 rounded-full">
                  <FaUserTie />
                  <span>Type</span>
                </div>
                <span>{data?.internshipType}</span>
              </div>

              {/* Start Date */}
              <div className="flex items-center gap-2 rounded-full border border-gray-300 text-sm">
                <div className="flex items-center space-x-2 bg-blue-100 font-medium px-3 py-1 rounded-full">
                  <FaClock />
                  <span>START DATE</span>
                </div>
                <span>
                  {data?.isImmediate
                    ? "immediately"
                    : `${formatDate(data?.joinFrom)}`}
                </span>
              </div>

              {/* CTC */}
              <div className="flex items-center gap-2 rounded-full border border-gray-300 text-sm">
                <div className="flex items-center space-x-2 bg-blue-100 font-medium px-3 py-1 rounded-full">
                  <FaMoneyBillWave />
                  <span>Stipend</span>
                </div>
                {data?.isPaid ? (
                  <span>
                    ₹ {data?.minStipend} - {data?.maxStipend}
                  </span>
                ) : (
                  "Unpaid"
                )}
              </div>

              {/* Apply By */}
              <div className="flex items-center gap-2 border rounded-full border-gray-300  text-sm">
                <div className="flex items-center space-x-2 bg-blue-100 font-medium px-3 py-1 rounded-full">
                  <FaCalendarAlt />
                  <span>APPLY BY</span>
                </div>
                <span>13 June 2025</span>
              </div>

              {/* Perks */}
              <div className="flex items-center gap-2 border rounded-full border-gray-300 text-sm">
                <div className="flex items-center space-x-2 bg-blue-100 font-medium px-3 py-1 rounded-full">
                  <FaGift />
                  <span>Perks</span>
                </div>
                <span>5 days a week</span>
              </div>

              {/* Footer */}
              {user?.role !== "EMPLOYER" && user?.role !== "ADMIN" && (
                <div className="flex items-center justify-between mt-4">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition">
                    <FaShareAlt className="text-blue-600" />
                  </div>
                  <div className="flex-1 ml-2">
                    <button
                      onClick={handleApplyClick}
                      disabled={data?.isApplied || false}
                      className={`w-full ${
                        data?.isApplied
                         ? "bg-gray-200 text-gray-800"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }  font-semibold py-2 px-4 rounded-full transition`}
                    >
                      {data?.isApplied ? "Applied" : " Apply Now"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <section className="mt-6">
          <p className="font-semibold text-gray-700 mb-1">Skills Required:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {data?.skillsRequired?.split(",").map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>

        {/* About Company */}
        <section className="mt-6">
          <p className="font-semibold text-gray-700 mb-1">
            About {data?.employer.companyName}
          </p>
          <p className="text-sm text-gray-700">{data?.employer.discription}</p>
        </section>

        {/* Apply Button (Mobile only) */}
        {user?.role !== "EMPLOYER" && user?.role !== "ADMIN" && (
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition lg:hidden">
              <FaShareAlt className="text-blue-600" />
            </div>
            <button
              onClick={handleApplyClick}
              disabled={data?.isApplied || false}
              className={`w-80 ${
                data?.isApplied
                ? "bg-gray-200 text-gray-800"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              } py-2 rounded  transition text-sm font-semibold`}
            >
              {data?.isApplied ? "Applied" : " Apply Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDetail;
