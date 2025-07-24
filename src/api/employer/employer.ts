import type { JobPostResponse } from "./response/JobPostResponse.ts";
import type { JobPostRequest } from "./request/JobPostRequest.ts";
import type { InternshipPostRequest } from "./request/InternshipPostRequest.ts";
import type { InternshipPostResponse } from "./response/InternshipPostResponse.ts";
import type { JobsResponse } from "./response/JobsResponse.ts";
import type { InternshipsResponse } from "./response/InternshipsResponse.ts";
import type { DashboardResponse } from "./response/DashboardResponse.ts";
import axios from "../axios.ts";

export const postJobApi = async (
  data: JobPostRequest
): Promise<JobPostResponse> => {
  const response = await axios.post("/api/employer/jobpost", data);
  return response.data;
};

export const postInternshipApi = async (
  data: InternshipPostRequest
): Promise<InternshipPostResponse> => {
  const response = await axios.post("/api/employer/internshipPost", data);
  return response.data;
};

export const getJobsApi = async (): Promise<JobsResponse> => {
  const response = await axios.get("/api/employer/jobpost");
  return response.data;
};

export const getInternshipsApi = async (): Promise<InternshipsResponse> => {
  const response = await axios.get("/api/employer/internshipPosts");
  return response.data;
};

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await axios.get("/api/employer/dashboard");
  return response.data;
};
