import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Briefcase, IndianRupee, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helper";
import type { JobCard } from "../types/JobCard";
import type { InternshipCard } from "../types/InternshipCard";
import axios from "axios";
import { bookmarkInternship, bookmarkJob, getStudentBookmarkedInternshipsApi, getStudentBookmarksApi } from "../api/student/student";
import toast from "react-hot-toast";

interface JobInternCardProps {
  data: JobCard | InternshipCard;
  isJob?: boolean;
}

const JobInternCard: React.FC<JobInternCardProps> = (props) => {
  const { data, isJob } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    if (isJob) navigate(`/jobs/detail/${data.id}`);
    else navigate(`/internships/detail/${data.id}`);
  };
const fetchBookmarks = async () => {
  try {
    const res = isJob
      ? await getStudentBookmarksApi()
      : await getStudentBookmarkedInternshipsApi();
    const ids = res.data.map((item) => item.id.toString());
    setBookmarkedIds(new Set(ids));
  } catch (err) {
    console.error("Failed to load bookmarks", err);
  }
};
const handleBookmarkClick = async () => {
  try {
    const res = isJob
      ? await bookmarkJob(data.id.toString())
      : await bookmarkInternship(data.id.toString());

    toast.success(res.message || "Bookmarked!");
    fetchBookmarks(); // Refresh the state
  } catch (e: any) {
    toast.error(e?.message || "Bookmark failed");
  }
};




  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  

useEffect(() => {
   

    fetchBookmarks();
  }, []);

  const isBookmarked = bookmarkedIds.has(data.id.toString());

  return isJob ? (
    <div
     
      className="w-full max-w-full hover:scale-105 sm:max-w-full md:max-w-md cursor-pointer flex flex-col gap-2 rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
    >
      {/* Card Body */}
      <div className="bg-blue-100 m-2 flex flex-col gap-3 p-4 rounded-2xl relative">
        {/* Bookmark Icon */}
        <div className="flex justify-between items-center">
          <div className="bg-white text-sm rounded-full py-2 px-4">
            {formatDate(data.createdAt)}
          </div>

<button onClick={handleBookmarkClick}>
  {isBookmarked ? (
    <BookmarkCheck className="w-5 h-5 text-yellow-500" />
  ) : (
    <Bookmark className="w-5 h-5 text-gray-500" />
  )}
</button>


        </div>

        {/* Company Name */}

        {/* Title & Logo */}
        <div className="flex flex-col gap-2"  onClick={handleClick}>
          <div className="flex mt-2 flex-row items-center justify-between gap-3">
            <h2 className=" font-bold text-black leading-tight">
              {data.title} <br className="sm:hidden" />
            </h2>
            <img
              src={data.logo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600">{data.companyName}</p>
        </div>

        {/* Tags */}
        <div className="flex justify-between flex-wrap gap-2 mt-2">
          <span className="text-xs sm:text-sm bg-white text-black border border-gray-300 px-3 py-1 rounded-full">
            {(data as JobCard).jobType}
          </span>
          {(data as JobCard).isApplied && (
            <span className="text-sm  text-gray-800 bg-gray-300 font-semibold  px-3 py-1 rounded-full">
              Applied
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white">
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <div className="flex flex-col 2xl:flex-row gap-0 2xl:gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
            <div className="flex mt-1 gap-1">
              <span className="d-flex justify-content-center align-items-center">
                <Briefcase size={16} />
              </span>

              {(data as JobCard).minExperience === 0 &&
              (data as JobCard).maxExperience === 0 ? (
                <p className="flex justify-center items-center">fresher</p>
              ) : (
                <p className="">
                  {(data as JobCard).minExperience} -{" "}
                  {(data as JobCard).maxExperience}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span>
              {(data as JobCard).minSalary} - {(data as JobCard).maxSalary}
            </span>
          </div>
        </div>

        <button className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-full text-sm ">
          Details
        </button>
      </div>
    </div>
  ) : (
    <div
    
      className="w-full max-w-full hover:scale-105 sm:max-w-full md:max-w-md cursor-pointer flex flex-col gap-2 rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
    >
      {/* Card Body */}
      <div className="bg-blue-100 m-2 flex flex-col gap-3 p-4 rounded-2xl relative">
        {/* Bookmark Icon */}
        <div className="flex justify-between items-center">
          <div className="bg-white text-sm rounded-full py-2 px-4">
            {formatDate(data.createdAt)}
          </div>

 <button onClick={handleBookmarkClick}>
  {isBookmarked ? (
    <BookmarkCheck className="w-5 h-5 text-yellow-500" />
  ) : (
    <Bookmark className="w-5 h-5 text-gray-500" />
  )}
</button>

        </div>

        {/* Company Name */}

        {/* Title & Logo */}
        <div className="flex flex-col gap-1"   onClick={handleClick}>
          <div className="flex mt-2 flex-row items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-black leading-tight">
              {data.title} <br className="sm:hidden" />
            </h2>
            <img
              src={data.logo}
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600">{data.companyName}</p>
        </div>

        {/* Tags */}
        <div className="flex justify-between flex-wrap gap-2 mt-2">
          <span className="text-xs sm:text-sm bg-white text-black border border-gray-300 px-3 py-1 rounded-full">
            {(data as InternshipCard).internshipType}
          </span>
          {(data as InternshipCard).isApplied && (
            <span className="text-sm  text-gray-800 bg-gray-300 font-semibold  px-3 py-1 rounded-full">
              Applied
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white">
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <div className="flex flex-col 2xl:flex-row gap-0 2xl:gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span>
              {(data as InternshipCard).minStipend} -{" "}
              {(data as InternshipCard).maxStipend}
            </span>
          </div>
        </div>

        <button className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-full text-sm">
          Details
        </button>
      </div>
    </div>
  );
};

export default JobInternCard;
