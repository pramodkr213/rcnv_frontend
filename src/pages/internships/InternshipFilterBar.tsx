import React, { useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { BanknoteArrowDown } from "lucide-react";
import type { InternshipFilterState } from "../admin/internshiplist/InternshipList";
import { useInternshipFilterContext } from "../../context/jobility/InternshipFilterContext";

export const InternshipFilterBar: React.FC<{
  onFilter: (filters: InternshipFilterState) => void;
}> = ({ onFilter }) => {
  const { filters, setFilters } = useInternshipFilterContext();

  const min = 2000;
  const max = 50000;
  const step = 1000;

  // Debounce filters for smoother filtering
  const [debouncedStipend] = useDebounce(filters.stipend, 300);
  const combinedFilters = { ...filters, salary: debouncedStipend };

  useEffect(() => {
    onFilter?.(combinedFilters);
  }, [combinedFilters, onFilter]);

  const handleMinStipend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.stipend[1] - step);
    setFilters((prev) => ({ ...prev, stipend: [value, prev.stipend[1]] }));
  };

  const handleMaxStipend = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Math.max(Number(e.target.value), filters.stipend[0] + step);
    setFilters((prev) => ({ ...prev, stipend: [prev.stipend[0], value] }));
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
          type="search"
          name="role"
          placeholder="Search role"
          value={filters.role}
          onChange={handleChange}
          className="bg-transparent outline-none"
        />
      </div>

      <span className="border-l border-black h-6" />

      {/* Location */}
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-600" />
        <input
          type="search"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          className="bg-transparent outline-none"
        />
      </div>

      <span className="border-l border-black h-6" />

      {/* Experience */}
      <div className="flex items-center gap-2">
        <BanknoteArrowDown className="text-gray-600" />
        <select
          name="incentive"
          value={filters.incentive}
          onChange={handleChange}
          className="bg-transparent cursor-pointer outline-none"
        >
          <option value="">Incentive</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <span className="border-l border-black h-6" />

      {/* Job Type */}
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-gray-600" />
        <select
          name="internshipType"
          value={filters.internshipType}
          onChange={handleChange}
          className="bg-transparent cursor-pointer outline-none"
        >
          <option value="">Internship Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>

      <span className="border-l border-black h-6" />

      {/* Salary Range */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 text-sm font-medium mb-1">
          <span>Stipend range</span>
          <span>
            ₹{filters.stipend[0].toLocaleString()} - ₹
            {filters.stipend[1].toLocaleString()}{" "}
          </span>
        </div>
        <div className="relative h-1 bg-gray-300 rounded w-52">
          <div
            className="absolute h-1 bg-blue-500 rounded"
            style={{
              left: `${((filters.stipend[0] - min) / (max - min)) * 100}%`,
              right: `${
                100 - ((filters.stipend[1] - min) / (max - min)) * 100
              }%`,
            }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={filters.stipend[0]}
            onChange={handleMinStipend}
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
            value={filters.stipend[1]}
            onChange={handleMaxStipend}
            className="absolute w-full pointer-events-none appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1"
          />
        </div>
      </div>
    </div>
  );
};
