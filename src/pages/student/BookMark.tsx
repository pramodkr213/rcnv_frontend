import React, { useEffect, useState, Suspense } from "react";
import type { JobCard } from "../../types/JobCard";
import { Loader } from "lucide-react";
import JobInternCard from "../../components/JobInternCard";
import {
  getStudentBookmarksApi,
  getStudentBookmarkedInternshipsApi,
} from "../../api/student/student";

const BookMark: React.FC = () => {
  const [isJob, setIsJob] = useState(true);
  const [bookmarked, setBookmarked] = useState<JobCard[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBookmarks = async () => {
    try {
      const res = isJob
        ? await getStudentBookmarksApi()
        : await getStudentBookmarkedInternshipsApi();

      if (res.data && Array.isArray(res.data)) {
        setBookmarked(res.data);
        setErrorMsg(""); // clear previous errors
      } else {
        setBookmarked([]);
        setErrorMsg("No bookmarked " + (isJob ? "jobs" : "internships") + " found.");
      }
    } catch (err) {
      setBookmarked([]);
      setErrorMsg("Failed to fetch bookmarks.");
      console.error("Bookmark fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [isJob]); // refetch when toggling between job/internship

  return (
    <section>
      <section className="container my-5 mx-auto flex flex-col 2xl:px-30 md:flex-row gap-6">
        <div className="flex-1 flex flex-col items-center lg:items-start px-5 lg:px-0 gap-5 overflow-y-auto scrollbar-hide ">
          <div className="flex flex-wrap items-start justify-between gap-4 px-2 w-full">
            <p className="text-xl sm:text-2xl font-bold">Bookmarks</p>
            <button
              onClick={() => setIsJob((prev) => !prev)}
              className="btn btn-sm btn-outline-primary"
            >
              {isJob ? "Show Internships" : "Show Jobs"}
            </button>
          </div>

          <Suspense fallback={<Loader />}>
            {bookmarked.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {bookmarked.map((job: JobCard, index: number) => (
                  <JobInternCard key={index} data={job} isJob={isJob}  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-40">
                <p className="text-center text-gray-500">
                  {errorMsg || "No results found."}
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </section>
  );
};

export default BookMark;
