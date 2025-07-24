import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  useInternshipFilterContext,
  type InternshipFilterState,
} from "../context/jobility/InternshipFilterContext";

const dateOptions = [
  { label: "Last 24 hours", value: 1 },
  { label: "Last 7 days", value: 7 },
  { label: "Last 14 days", value: 14 },
  { label: "Last 30 days", value: 30 },
];

const internshipTypeOptions = ["Full Time", "Part Time"];
const internshipModeOptions = ["Hybrid", "In-office", "Remote"];

const InternshipSidebarFilter: React.FC<{
  onFilter: (filters: InternshipFilterState) => void;
}> = ({ onFilter }) => {
  const { filters, resetFilters, setFilters } = useInternshipFilterContext();

  // Debounce filters state with 300ms delay
  const [debouncedFilters] = useDebounce(filters, 300);

  // Call onFilter only after debounce delay
  useEffect(() => {
    onFilter?.(debouncedFilters);
  }, [debouncedFilters, onFilter]);

  const handleDateChange = (value: number) => {
    setFilters((prev) => ({ ...prev, days: value }));
  };

  const handleInternshipTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, internshipType: value }));
  };

  const handleInternshipModeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, mode: value }));
  };

  return (
    <div className="w-full max-w-[16rem] sticky top-20 bg-white p-4">
      <h2 className="text-lg font-bold mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        Filter
      </h2>

      {/* Date Posted */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Date Posted</p>
        <ul className="space-y-2 text-sm">
          {dateOptions.map(({ label, value }) => (
            <li key={label}>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="date"
                  className="accent-blue-600"
                  checked={filters.days === value}
                  onChange={() => handleDateChange(value)}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Internship Type</p>
        <ul className="space-y-2 text-sm">
          {internshipTypeOptions.map((item) => (
            <li key={item}>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  className="accent-green-600"
                  checked={filters.internshipType === item}
                  onChange={() => handleInternshipTypeChange(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Mode */}
      <div>
        <p className="font-semibold mb-2">Internship Mode</p>
        <ul className="space-y-2 text-sm">
          {internshipModeOptions.map((item) => (
            <li key={item}>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  className="accent-green-600"
                  checked={filters.mode === item}
                  onChange={() => handleInternshipModeChange(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          onClick={resetFilters}
          className="w-full mt-5 px-4 py-2 text-white bg-blue-600 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default InternshipSidebarFilter;
