import React, { useState } from "react";
import JobPostForm from "../../../components/JobPostForm";

const JobPost: React.FC = () => {
  const [type, setType] = useState<"job" | "internship">("job");

  return (
    <div className="">
      <div className="bg-[#E4EDFF] flex flex-col justify-center items-center gap-3 py-8">
        <h1 className="text-3xl font-semibold text-center">
          Post Job <span className="text-blue-600">/ Internship</span>
        </h1>
        <p className="text-center font-medium">
          Hire early talent with work experience up to 2 years
        </p>
      </div>

      <div className="max-w-3xl mx-auto p-6 bg-white">
        <div className="mb-6 border rounded border-gray-300 p-4">
          <label className="block font-semibold mb-2">Opportunity type</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                checked={type === "job"}
                onChange={() => setType("job")}
              />
              Job
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                checked={type === "internship"}
                onChange={() => setType("internship")}
              />
              Internship
            </label>
          </div>
        </div>

        <JobPostForm type={type} />
      </div>
    </div>
  );
};

export default JobPost;
