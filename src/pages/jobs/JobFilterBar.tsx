import React, { useEffect } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDebounce } from "use-debounce";
import type { JobFilterState } from "../admin/joblist/JobList";
import { useJobFilterContext } from "../../context/jobility/JobFilterContext";

export const JobFilterBar: React.FC<{
  onFilter: (filters: JobFilterState) => void;
}> = ({ onFilter }) => {
  const { filters, setFilters } = useJobFilterContext();

  const min = 5000;
  const max = 100000;
  const step = 1000;

  // Debounce filters for smoother filtering
  const [debouncedSalary] = useDebounce(filters.salary, 300);
  const combinedFilters = { ...filters, salary: debouncedSalary };

  useEffect(() => {
    onFilter?.(combinedFilters);
  }, [combinedFilters, onFilter]);

  const handleMinSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.salary[1] - step);
    setFilters((prev) => ({ ...prev, salary: [value, prev.salary[1]] }));
  };

  const handleMaxSalary = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Math.max(Number(e.target.value), filters.salary[0] + step);
    setFilters((prev) => ({ ...prev, salary: [prev.salary[0], value] }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#e7f0fe] px-6 py-4 justify-center rounded-md shadow-sm flex flex-wrap items-center gap-6 text-sm w-full">
      {/* Role */}
      <div className="flex items-center gap-2">
        <FaSearch className="text-gray-600" />
       <input
  type="text"
  name="role"
  placeholder="Search role"
  value={filters.role}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
/>

      </div>

      <span className="border-l border-black h-6" />

      {/* Location */}
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-600" />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      <span className="border-l border-black h-6" />

      {/* Experience */}
      <div className="flex items-center gap-2">
        <FaBriefcase className="text-gray-600" />
        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
          className="bg-transparent cursor-pointer outline-none"
        >
          <option value="">Experience</option>
          <option value="fresher">Fresher</option>
          <option value="0-1">0–1 year</option>
          <option value="1-3">1–3 years</option>
          <option value="3-5">3–5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      <span className="border-l border-black h-6" />

      {/* Job Type */}
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-gray-600" />
        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          className="bg-transparent cursor-pointer outline-none"
        >
          <option value="">Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>

      {/* <span className="border-l border-black h-6" /> */}

      {/* Salary Range */}
      {/* <div className="flex flex-col gap-1">
        <div className="flex gap-2 text-sm font-medium mb-1">
          <span>Salary range</span>
          <span>
            ₹{filters.salary[0].toLocaleString()} - ₹
            {filters.salary[1].toLocaleString()}{" "}
          </span>
        </div>
        <div className="relative h-1 bg-gray-300 rounded w-52">
          <div
            className="absolute h-1 bg-blue-500 rounded"
            style={{
              left: `${((filters.salary[0] - min) / (max - min)) * 100}%`,
              right: `${
                100 - ((filters.salary[1] - min) / (max - min)) * 100
              }%`,
            }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={filters.salary[0]}
            onChange={handleMinSalary}
            className="absolute w-full pointer-events-none appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1"
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={filters.salary[1]}
            onChange={handleMaxSalary}
            className="absolute w-full pointer-events-none appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1"
          />
        </div>
      </div> */}
    </div>
  );
};
