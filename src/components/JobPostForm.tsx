import React, { type ChangeEvent, type FormEvent, useState } from "react";
// import { useError } from "../../../context/ErrorContext.tsx";
// import type { Post } from "../../../types/Post.ts";
// import { validatePost } from "../../../utils/FormValidation.ts";
// import type { JobPostRequest } from "../../../api/employer/request/JobPostRequest.ts";
// import { getDecryptedAuthCookie } from "../../../utils/AuthCookie.tsx";
// import { useUserLoader } from "../../../context/UserLoaderContext.tsx";
// import {
//   postInternshipApi,
//   postJobApi,
// } from "../../../api/employer/employer.ts";
import { useNavigate } from "react-router-dom";
import { useError } from "../ErrorContext";
import type { Post } from "../types/Post";
import { getDecryptedAuthCookie } from "../utils/cookieCrypto";
import type { JobPostRequest } from "../api/employer/request/JobPostRequest";
import { postInternshipApi, postJobApi } from "../api/employer/employer";
import type { InternshipPostRequest } from "../api/employer/request/InternshipPostRequest";
import { validatePost } from "../utils/FormValidation";
import { ToastMessage } from "../utils/toast";
import QuillEditor from "./QuillEditor";
// import type { InternshipPostRequest } from "../../../api/employer/request/InternshipPostRequest.ts";
// import { showToast } from "../../../utils/showToast.ts";

interface Props {
  type: "job" | "internship";
}

const JobPostForm: React.FC<Props> = (props) => {
  const type = props.type;
  const { errors, setFormErrors } = useError();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postError = errors.post;

  const [form, setForm] = useState<Post>({
    jobTitle: "",
    experienceMin: "",
    experienceMax: "",
    skills: "",
    jobType: "In-office",
    jobCity: "",
    jobDays: "",
    timeType: "Part Time",
    openings: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    salaryType: "year",
    internshipTitle: "",
    internshipSkills: "",
    internshipType: "In-office",
    internshipCity: "",
    internshipDays: "",
    internshipTime: "Part Time",
    internshipOpenings: "",
    internshipStart: "immediate",
    startDateFrom: "",
    lastApplyDateJob: "",
    lastApplyDateInternship: "",
    startDateTo: "",
    duration: "1",
    durationUnit: "month",
    responsibilities: "",
    stipendType: "Paid",
    stipendMin: "",
    stipendMax: "",
    internshipSalaryType: "month",
    experienceType: "fresher",
    sector: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "checkbox") {
      const checked = (target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === "experienceType" && value === "fresher") {
        setForm((prev) => ({
          ...prev,
          fresher: true,
          experienceType: value as "fresher" | "experienced",
          experienceMin: "",
          experienceMax: "",
        }));
      }
    }
  };

  const addPost = async (
    data: Post,
    showLoader: () => void,
    hideLoader: () => void
  ) => {
    try {
      showLoader();
      const user = getDecryptedAuthCookie();
      const jobPostReq: JobPostRequest = {
        title: data.jobTitle,
        description: data.description,
        minExperience:
          data.experienceType === "fresher" ? 0 : Number(data.experienceMin),
        maxExperience:
          data.experienceType === "fresher" ? 0 : Number(data.experienceMax),
        location: data.jobCity,
        jobType: data.timeType,
        mode: data.jobType,
        skills: data.skills,
        minSalary: Number(data.salaryMin),
        maxSalary: Number(data.salaryMax),
        numOfWorkingDays: Number(data.jobDays),
        numberOfVacancies: Number(data.openings),
        postedBy: user.email,
        fresher: data.experienceType === "fresher",
        lastDate: data.lastApplyDateJob,
        sector: data.sector,
      };

      return await postJobApi(jobPostReq);
    } catch (error) {
      console.log("Error while adding post:", error);
      throw error;
    } finally {
      hideLoader();
    }
  };

  const addInternship = async (
    data: Post,
    showLoader: () => void,
    hideLoader: () => void
  ) => {
    try {
      showLoader();
      const user = getDecryptedAuthCookie();
      const internshipReq: InternshipPostRequest = {
        title: data.internshipTitle,
        duration: data.duration,
        paid: data.stipendType === "Paid",
        minStipend: Number(data.stipendMin),
        maxStipend: Number(data.stipendMax),
        mode: data.internshipType,
        location: data.internshipCity,
        intershipType: data.internshipTime,
        skillsRequired: data.internshipSkills,
        numberOfOpenings: Number(data.internshipOpenings),
        isImmediate: data.internshipStart === "immediate",
        joinFrom: data.startDateFrom,
        joinTo: data.startDateTo,
        internshipDescription: data.responsibilities,
        postedBy: user?.email,
        applicationDeadline: data.lastApplyDateInternship,
      };

      return await postInternshipApi(internshipReq);
    } catch (error) {
      console.log("Error while adding post:", error);
      throw error;
    } finally {
      hideLoader();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validatePost(type, form, setFormErrors)) {
      if (type === "job") {
        await ToastMessage.promise(
          addPost(
            form,
            () => setLoading(true),
            () => setLoading(false)
          ),
          {
            loading: "Adding Post...",
            success: "Post Added!",
            error: "Failed to add post!!",
          }
        );
        setFormErrors("post", {});
        navigate("/employer/my-jobs");
      } else {
        await ToastMessage.promise(
          addInternship(
            form,
            () => setLoading(true),
            () => setLoading(false)
          ),
          {
            loading: "Adding Post...",
            success: "Post Added!",
            error: "Failed to add post!!",
          }
        );
        setFormErrors("post", {});
        navigate("/employer/my-internships");
      }
    }
  };
const handleChangeJobSector = (e) => {
  const { name, value } = e.target;
  
  // Update form state
  setForm(prevForm => ({
    ...prevForm,
    [name]: value,
  }));

 
};

  return (
    <form className="space-y-6 " onSubmit={handleSubmit}>
      {type === "job" ? (
        <>
          <div className="space-y-4 border rounded border-gray-300 p-4 ">
            <label className="block font-semibold">Job Title</label>
            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              type="text"
              className={`w-full p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.jobTitle ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.jobTitle && (
              <p className="text-red-500 text-xs">{postError.jobTitle}</p>
            )}

            {/* Job Sector Dropdown */}
            <label className="block font-semibold mt-2">Job Sector</label>
            <select
              name="sector"
              value={form.sector}
              onChange={(e)=>handleChangeJobSector(e)}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.jobSector ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Sector</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Sales">Sales</option>
              <option value="Education">Education</option>
              <option value="Realestate">Realestate</option>
              <option value="Others">Others</option>
            </select>
            {postError.sector && (
              <p className="text-red-500 text-xs">{postError.sector}</p>
            )}


            <div className=" space-y-4">
              <h3 className="font-bold">Experience</h3>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="experienceType"
                    value="fresher"
                    checked={form.experienceType === "fresher"}
                    onChange={handleChange}
                  />
                  Fresher
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="experienceType"
                    value="experienced"
                    checked={form.experienceType === "experienced"}
                    onChange={handleChange}
                  />
                  Experienced
                </label>
              </div>
              {postError.experienceType && (
                <p className="text-red-500 text-xs">
                  {postError.experienceType}
                </p>
              )}

              {form.experienceType === "experienced" && (
                <div className="flex gap-4">
                  <div className="w-[50%] flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      min
                      <input
                        type="number"
                        name="experienceMin"
                        value={form.experienceMin}
                        onChange={handleChange}
                        placeholder="Min Years"
                        className={`w-full p-2 border rounded focus:outline-none border-gray-300lue-600 ${postError.experienceMin
                            ? "border-red-500"
                            : " focus:border-b"
                          }`}
                        min={0}
                      />
                    </label>
                    {postError.experienceMin && (
                      <p className="text-red-500 text-xs">
                        {postError.experienceMin}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%] flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      max
                      <input
                        type="number"
                        name="experienceMax"
                        value={form.experienceMax}
                        onChange={handleChange}
                        placeholder="Max Years"
                        className={`w-full p-2 border rounded focus:outline-none border-gray-300lue-600 ${postError.experienceMax
                            ? "border-red-500"
                            : " focus:border-b"
                          }`}
                        min={0}
                      />
                    </label>
                    {postError.experienceMax && (
                      <p className="text-red-500 text-xs">
                        {postError.experienceMax}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <label className="block font-semibold">Skills Required</label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              type="text"
              className={`w-full p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.skills ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.skills && (
              <p className="text-red-500 text-xs">{postError.skills}</p>
            )}

            <label className="block font-semibold">Job type</label>
            <div className="flex gap-5 mb-4">
              {["In-office", "Hybrid", "Remote"].map((jType) => (
                <label key={jType} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="jobType"
                    value={jType}
                    checked={form.jobType === jType}
                    onChange={handleChange}
                  />
                  {jType}
                </label>
              ))}
            </div>
            {postError.jobType && (
              <p className="text-red-500 text-xs">{postError.jobType}</p>
            )}

            {/* Conditional Fields Based on jobType */}
            {form.jobType === "In-office" && (
              <div className="mb-4">
                <label className="block font-semibold mb-3">City</label>
                <input
                  name="jobCity"
                  value={form.jobCity}
                  onChange={handleChange}
                  type="text"
                  className={`w-full p-2 focus:outline-none border rounded focus:border-blue-500 ${postError.jobCity ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {postError.jobCity && (
                  <p className="text-red-500 text-xs">{postError.jobCity}</p>
                )}
              </div>
            )}

            {form.jobType === "Hybrid" && (
              <div className="mb-4 space-y-4">
                <div>
                  <label className="block font-semibold mb-3">City</label>
                  <input
                    name="jobCity"
                    value={form.jobCity}
                    onChange={handleChange}
                    type="text"
                    className={`w-full p-2 focus:outline-none border rounded focus:border-blue-500 ${postError.jobCity ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {postError.jobCity && (
                    <p className="text-red-500 text-xs">{postError.jobCity}</p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-3">
                    Number of In-Office Working Days (1–6)
                  </label>
                  <select
                    name="jobDays"
                    value={form.jobDays}
                    onChange={handleChange}
                    className={`w-full p-2 focus:outline-none border rounded focus:border-blue-500 ${postError.jobDays ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  {postError.jobDays && (
                    <p className="text-red-500 text-xs">{postError.jobDays}</p>
                  )}
                </div>
              </div>
            )}

            <label className="block font-semibold">Part-time / Full Time</label>
            <div className="flex gap-5">
              {["Part Time", "Full Time"].map((tType) => (
                <label key={tType} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="timeType"
                    value={tType}
                    checked={form.timeType === tType}
                    onChange={handleChange}
                  />
                  {tType}
                </label>
              ))}
              {postError.timeType && (
                <p className="text-red-500 text-xs">{postError.timeType}</p>
              )}
            </div>

            <label className="block font-semibold">Number of Openings</label>
            <input
              name="openings"
              value={form.openings}
              onChange={handleChange}
              type="number"
              className={`w-full p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.openings ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.openings && (
              <p className="text-red-500 text-xs">{postError.openings}</p>
            )}

            <label className="block font-semibold">Job description</label>

            <QuillEditor
              value={form.description}
              onChange={(value) =>
                setForm(() => ({
                  ...form,
                  description: value,
                }))
              }
            />

            {postError.description && (
              <p className="text-red-500 text-xs">{postError.description}</p>
            )}

            <label className="block font-semibold">Last Apply Date</label>
            <input
              name="lastApplyDateJob"
              value={form.lastApplyDateJob}
              onChange={handleChange}
              type="date"
              className={` p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.jobTitle ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.lastApplyDateJob && (
              <p className="text-red-500 text-xs">
                {postError.lastApplyDateJob}
              </p>
            )}
          </div>

          <div className=" p-4 border rounded border-gray-300 space-y-4">
            <h3 className="font-bold">Salary</h3>

            <label className="block font-semibold">Salary (₹)</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="salaryMin"
                value={form.salaryMin}
                onChange={handleChange}
                placeholder="Min"
                className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.salary ? "border-red-500" : "border-gray-300"
                  }`}
              />

              <input
                type="number"
                name="salaryMax"
                value={form.salaryMax}
                onChange={handleChange}
                placeholder="Max"
                className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.salary ? "border-red-500" : "border-gray-300"
                  }`}
              />

              <select
                name="salaryType"
                value="year"
                disabled
                className="w-full p-2 border rounded focus:outline-none border-gray-300 focus:border-blue-600 bg-gray-100 cursor-not-allowed"
              >
                <option value="year">/year</option>
              </select>
            </div>
            {postError.salary && (
              <p className="text-red-500 text-xs">{postError.salary}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4 border rounded border-gray-300 p-4 ">
            <label className="block font-semibold">Internship Title</label>
            <input
              name="internshipTitle"
              value={form.internshipTitle}
              onChange={handleChange}
              type="text"
              className={`w-full p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.internshipTitle ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.internshipTitle && (
              <p className="text-red-500 text-xs">
                {postError.internshipTitle}
              </p>
            )}

            <label className="block font-semibold">Skills Required</label>
            <input
              name="internshipSkills"
              value={form.internshipSkills}
              onChange={handleChange}
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.internshipSkills
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
            {postError.internshipSkills && (
              <p className="text-red-500 text-xs">
                {postError.internshipSkills}
              </p>
            )}

            <label className="block font-semibold">Internship type</label>
            <div className="flex gap-5 mb-4">
              {["In-office", "Hybrid", "Remote"].map((jType) => (
                <label key={jType} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="internshipType"
                    value={jType}
                    checked={form.internshipType === jType}
                    onChange={handleChange}
                  />
                  {jType}
                </label>
              ))}
            </div>
            {postError.internshipType && (
              <p className="text-red-500 text-xs">{postError.internshipType}</p>
            )}

            {/* Conditional Fields Based on internshipType */}
            {form.internshipType === "In-office" && (
              <div className="mb-4">
                <label className="block font-semibold mb-3">City</label>
                <input
                  name="internshipCity"
                  value={form.internshipCity}
                  onChange={handleChange}
                  type="text"
                  className={`w-full p-2 border focus:outline-none focus:border-blue-500 rounded ${postError.internshipCity
                      ? "border-red-500"
                      : "border-gray-300"
                    }`}
                />
                {postError.internshipCity && (
                  <p className="text-red-500 text-xs">
                    {postError.internshipCity}
                  </p>
                )}
              </div>
            )}

            {form.internshipType === "Hybrid" && (
              <div className="mb-4 space-y-4">
                <div>
                  <label className="block font-semibold mb-3">City</label>
                  <input
                    name="internshipCity"
                    value={form.internshipCity}
                    onChange={handleChange}
                    type="text"
                    className={`w-full p-2 border focus:outline-none focus:border-blue-500 rounded ${postError.internshipCity
                        ? "border-red-500"
                        : "border-gray-300"
                      }`}
                  />
                  {postError.internshipCity && (
                    <p className="text-red-500 text-xs">
                      {postError.internshipCity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold mb-3">
                    Number of In-Office Working Days (1–6)
                  </label>
                  <select
                    name="internshipDays"
                    value={form.internshipDays}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.internshipDays
                        ? "border-red-500"
                        : "border-gray-300"
                      }`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  {postError.internshipDays && (
                    <p className="text-red-500 text-xs">
                      {postError.internshipDays}
                    </p>
                  )}
                </div>
              </div>
            )}

            <label className="block font-semibold">Part-time / Full Time</label>
            <div className="flex gap-5">
              {["Part Time", "Full Time"].map((tType) => (
                <label key={tType} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="internshipTime"
                    value={tType}
                    checked={form.internshipTime === tType}
                    onChange={handleChange}
                  />
                  {tType}
                </label>
              ))}
            </div>

            <label className="block font-semibold">Number of Openings</label>
            <input
              name="internshipOpenings"
              value={form.internshipOpenings}
              onChange={handleChange}
              type="number"
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.internshipOpenings
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
            {postError.internshipOpenings && (
              <p className="text-red-500 text-xs">
                {postError.internshipOpenings}
              </p>
            )}

            <label className="block font-semibold">Start Date</label>
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="internshipStart"
                  value="immediate"
                  checked={form.internshipStart === "immediate"}
                  onChange={handleChange}
                />
                Immediate
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="internshipStart"
                  value="later"
                  checked={form.internshipStart === "later"}
                  onChange={handleChange}
                />
                Date range
              </label>
            </div>

            {form.internshipStart === "later" && (
              <div className="flex gap-4 mb-4">
                <div className="w-[50%]">
                  <input
                    type="date"
                    name="startDateFrom"
                    value={form.startDateFrom}
                    onChange={handleChange}
                    className="p-2 w-full border rounded focus:outline-none border-gray-300 focus:border-blue-600"
                  />
                  {postError.startDateFrom && (
                    <p className="text-red-500 text-xs">
                      {postError.startDateFrom}
                    </p>
                  )}
                </div>
                <div className="w-[50%]">
                  <input
                    type="date"
                    name="startDateTo"
                    value={form.startDateTo}
                    onChange={handleChange}
                    className="p-2 w-full  border rounded focus:outline-none border-gray-300 focus:border-blue-600"
                  />
                  {postError.startDateTo && (
                    <p className="text-red-500 text-xs">
                      {postError.startDateTo}
                    </p>
                  )}
                </div>
              </div>
            )}

            <label className="block font-semibold">Duration</label>
            <div className="flex gap-4 mb-4">
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="p-2 border rounded w-[80%] focus:outline-none border-gray-300 focus:border-blue-600 "
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
              <select
                name="durationUnit"
                value={form.durationUnit}
                onChange={handleChange}
                className="p-2 border rounded w-32  focus:outline-none border-gray-300 focus:border-blue-600"
              >
                <option value="month">/month</option>
                <option value="week">/week</option>
              </select>
            </div>

            <label className="block font-semibold">Responsibilities</label>
            <QuillEditor
              value={form.responsibilities}
              onChange={(value) =>
                setForm(() => ({
                  ...form,
                  responsibilities: value,
                }))
              }
            />
            {postError.responsibilities && (
              <p className="text-red-500 text-xs">
                {postError.responsibilities}
              </p>
            )}

            <label className="block font-semibold">Last Apply Date</label>
            <input
              name="lastApplyDateInternship"
              value={form.lastApplyDateInternship}
              onChange={handleChange}
              type="date"
              className={` p-2 border rounded focus:outline-none  focus:border-blue-600 ${postError.jobTitle ? "border-red-500" : "border-gray-300"
                }`}
            />
            {postError.lastApplyDateInternship && (
              <p className="text-red-500 text-xs">
                {postError.lastApplyDateInternship}
              </p>
            )}
          </div>

          <div className="p-4 border rounded border-gray-300 space-y-4">
            <h3 className="font-bold">Stipend</h3>

            <label className="block font-semibold">Stipend Type</label>
            <div className="flex gap-4">
              {["Paid", "Unpaid"].map((stipend) => (
                <label key={stipend} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stipendType"
                    value={stipend}
                    checked={form.stipendType === stipend}
                    onChange={handleChange}
                  />
                  {stipend}
                </label>
              ))}
            </div>

            {form.stipendType === "Paid" && (
              <div className="grid grid-cols-3 gap-4">
                <input
                  name="stipendMin"
                  value={form.stipendMin}
                  onChange={handleChange}
                  placeholder="Min"
                  className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.stipend ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <input
                  name="stipendMax"
                  value={form.stipendMax}
                  onChange={handleChange}
                  placeholder="Max"
                  className={`w-full p-2 border rounded focus:outline-none focus:border-blue-600 ${postError.stipend ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <select
                  name="internshipSalaryType"
                  value={form.internshipSalaryType}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600`}
                >
                  <option value="month">/month</option>
                  <option value="week">/week</option>
                </select>
              </div>
            )}
            {postError.stipend && (
              <p className="text-red-500 text-xs">{postError.stipend}</p>
            )}
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className=" py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Post {type === "job" ? "Job" : "Internship"}
        </button>
      </div>
    </form>
  );
};

export default JobPostForm;
