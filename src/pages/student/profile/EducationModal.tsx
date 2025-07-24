import React, { useState, useEffect } from "react";
import type { Education } from "../../../types/Education";
import { educationOptions } from "../../../data/EducationData";

interface Props {
  education: Education | null;
  onClose: () => void;
  onSave: (edu: Education) => void;
}

const EducationModal: React.FC<Props> = ({ education, onClose, onSave }) => {
  const [form, setForm] = useState<Education>({
    degree: "",
    type: "",
    college: "",
    fieldOfStudy: "",
    yearOfPassing: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 35 }, (_, i) => currentYear - 30 + i);

  useEffect(() => {
    if (education) {
      setForm(education);
    }
  }, [education]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 m-5 rounded-md w-full max-w-md ">
        <h2 className="text-lg font-semibold mb-4">
          {education ? "Edit" : "Add"} Education
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree Dropdown */}
          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="degree"
            value={form.degree}
            onChange={(e) => {
              const selectedDegree = e.target.value;
              setForm((prev) => ({
                ...prev,
                degree: selectedDegree,
                fieldOfStudy: "",
              }));
            }}
            required
          >
            <option value="">Select Degree</option>
            {educationOptions.map((edu) => (
              <option key={edu.degree} value={edu.degree}>
                {edu.degree}
              </option>
            ))}
          </select>

          {/* Branch Dropdown */}
          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="fieldOfStudy"
            value={form.fieldOfStudy}
            onChange={handleChange}
            required
            disabled={!form.degree}
          >
            <option value="">Select Branch</option>
            {educationOptions
              .find((e) => e.degree === form.degree)
              ?.branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
          </select>

          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Correspondence">Correspondence</option>
          </select>

          <input
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            placeholder="College"
            name="college"
            value={form.college}
            onChange={handleChange}
            required
          />

          <select
            className="w-full border border-gray-300 focus:outline-none focus:border-blue-600 p-2 rounded"
            name="yearOfPassing"
            value={form.yearOfPassing}
            onChange={handleChange}
            required
          >
            <option value="">Select Year of Passing</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;
