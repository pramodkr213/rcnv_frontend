import axios from "../axios.ts";
import type { JobsResponse } from "./response/JobsResponse.ts";
import type { JobResponse } from "./response/JobResponse.ts";

import type { InternshipResponse } from "./response/InternshipResponse.ts";
import type { InternshipsResponse } from "./response/InternshipsResponse.ts";
import type { JobFilterState } from "../../context/jobility/JobFilterContext.tsx";
import type { InternshipFilterState } from "../../context/jobility/InternshipFilterContext.tsx";

export const getJobsApi = async (
  filter?: JobFilterState
): Promise<JobsResponse> => {
  const response = await axios.get("/api/public/jobs", {
    params: filter && {
      page: filter.page,
      title: filter.role ? filter.role : null,
      location: filter.location ? filter.location : null,
      jobType: filter.jobType === "" ? null : filter.jobType,
      mode: filter.mode === "" ? null : filter.mode,
      sector: filter.sector || "",
      minExperience:
        filter.experience === ""
          ? null
          : filter.experience === "fresher"
          ? 0
          : filter.experience === "5+"
          ? 5
          : filter.experience.split("-").map(Number)[0],
      maxExperience:
        filter.experience === "fresher"
          ? 0
          : filter.experience === "5+"
          ? null
          : filter.experience.split("-").map(Number)[1],
      isFresher:
        filter.experience === "" ? null : filter.experience === "fresher",
      minSalary: filter.salary[0],
      maxSalary: filter.salary[1],
      days: filter.days,
    },
  });
  return response.data;
};


export interface SectorFilter {
  page: number;
  days: number;
  sector?: string;
}

export const getJobsBySectorApi = async (filter: SectorFilter) => {
  // Build only the params you want:
  const params: Record<string, any> = {
    page: filter.page,
    days: filter.days,
  };
  if (filter.sector) {
    params.sector = filter.sector;
  }

  const response = await axios.get("/api/public/jobs", { params });
  return response.data; // make sure this is typed as your JobsResponse
};


export const getInternshipsApi = async (
  filter?: InternshipFilterState
): Promise<InternshipsResponse> => {
  const response = await axios.get("/api/public/internships", {
    params: filter && {
      page: filter.page,
      title: filter.role ? filter.role : null,
      location: filter.location ? filter.location : null,
      internshipType:
        filter.internshipType === "" ? null : filter.internshipType,
      mode: filter.mode === "" ? null : filter.mode,
      isPaid: filter.incentive === "" ? null : filter.incentive === "paid",
      minStipend: filter.incentive === "paid" ? filter.stipend[0] : null,
      maxStipend: filter.incentive === "paid" ? filter.stipend[1] : null,
      days: filter.days,
    },
  });
  return response.data;
};

export const getJobByIdApi = async (
  id: string | undefined
): Promise<JobResponse> => {
  const response = await axios.get(`/api/public/job/${id}`);
  return response.data;
};

export const getInternshipByIdApi = async (
  id: string | undefined
): Promise<InternshipResponse> => {
  const response = await axios.get(`/api/public/internship/${id}`);
  return response.data;
};
