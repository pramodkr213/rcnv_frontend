import type { InternshipApplicationFilterState } from "../../pages/admin/applications/InternshipApplicationList";
import type { JobApplicationFilterState } from "../../pages/admin/applications/JobApplicationList";
import type { CandidateFilterState } from "../../pages/admin/candidates/CandidatesList";
import type { RequestsFilterState } from "../../pages/admin/employerRequest/EmployerRequests";
import type { EmployerFilterState } from "../../pages/admin/employers/EmployerList";
import type { InternshipFilterState } from "../../pages/admin/internshiplist/InternshipList";
import type { JobFilterState } from "../../pages/admin/joblist/JobList";
import axios from "../axios";
import type { ApplicationsResponse } from "./response/ApplicationResponse";
import type { CandidateDetailResponse } from "./response/CandidateDetailResponse";
import type { CandidatesResponse } from "./response/CandidatesResponse";
import type { DashboardResponse } from "./response/DashboardResponse";
import type { EmployersResponse } from "./response/EmployersResponse";
import type { InternshipsResponse } from "./response/InternshipsResponse";
import type { JobsResponse } from "./response/JobsResponse";
import type { RecentInternshipsResponse } from "./response/RecentInternshipsResponse";
import type { RecentJobsResponse } from "./response/RecentJobsResponse";
import type { SuccessResponse } from "./response/SuuccessResponse";

export const getDashboardApi = async (): Promise<DashboardResponse> => {
  const response = await axios.get("/api/admin/dashboard");
  return response.data;
};

export const getEmployersApi = async (
  filters: EmployerFilterState
): Promise<EmployersResponse> => {
  const response = await axios.get("/api/admin/employers", {
    params: {
      page: filters.page || 0,
      query: filters.name === "" ? null : filters.name,
      city: filters.location === "" ? null : filters.location,
      companyName: filters.companyName === "" ? null : filters.companyName,
      industryType: filters.industryType === "" ? null : filters.industryType,
      date: filters.date === "" ? null : filters.date,
    },
  });
  return response.data;
};

export const getEmployerRequestApi = async (
  filters: RequestsFilterState
): Promise<EmployersResponse> => {
  const response = await axios.get("/api/admin/employer/request", {
    params: {
      page: filters.page || 0,
      query: filters.name === "" ? null : filters.name,
      city: filters.location === "" ? null : filters.location,
      companyName: filters.companyName === "" ? null : filters.companyName,
      date: filters.date === "" ? null : filters.date,
      industryType: filters.industryType === "" ? null : filters.industryType,
    },
  });
  return response.data;
};

export const getJobsApi = async (
  filters: JobFilterState
): Promise<JobsResponse> => {
  const response = await axios.get("/api/admin/jobs", {
    params: {
      page: filters.page || 0,
      title: filters.title === "" ? null : filters.title,
      location: filters.location === "" ? null : filters.location,
      companyName: filters.companyName === "" ? null : filters.companyName,
      date: filters.date === "" ? null : filters.date,
    },
  });
  return response.data;
};

export const getStudentsApi = async (
  filters: CandidateFilterState
): Promise<CandidatesResponse> => {
  const response = await axios.get("/api/admin/students", {
    params: {
      page: filters.page || 0,
      keywords: filters.name === "" ? null : filters.name,
      city: filters.location === "" ? null : filters.location,
      date: filters.date === "" ? null : filters.date,
      degree: filters.degree === "" ? null : filters.degree,
      fieldOfStudy: filters.fieldOfStudy === "" ? null : filters.fieldOfStudy,
      yearOfPassing:
        filters.yearOfPassing === "" ? null : filters.yearOfPassing,
      college: filters.college === "" ? null : filters.college,
    },
  });
  return response.data;
};

export const getInternshipsApi = async (
  filters: InternshipFilterState
): Promise<InternshipsResponse> => {
  const response = await axios.get("/api/admin/internships", {
    params: {
      page: filters.page || 0,
      title: filters.title === "" ? null : filters.title,
      location: filters.location === "" ? null : filters.location,
      companyName: filters.companyName === "" ? null : filters.companyName,
      date: filters.date === "" ? null : filters.date,
    },
  });
  return response.data;
};

export const getJobApplicationsApi = async (
  filters: JobApplicationFilterState
): Promise<ApplicationsResponse> => {
  const response = await axios.get("/api/admin/job/applications", {
    params: {
      page: filters.page || 0,
      query: filters.query === "" ? null : filters.query,
      status: filters.status === "" ? null : filters.status,
      companyName: filters.companyName === "" ? null : filters.companyName,
      location: filters.location === "" ? null : filters.location,
      date: filters.date === "" ? null : filters.date,
    },
  });
  return response.data;
};

export const getInternshipApplicationsApi = async (
  filters: InternshipApplicationFilterState
): Promise<ApplicationsResponse> => {
  const response = await axios.get("/api/admin/internship/applications", {
    params: {
      page: filters.page || 0,
      query: filters.query === "" ? null : filters.query,
      status: filters.status === "" ? null : filters.status,
      companyName: filters.companyName === "" ? null : filters.companyName,
      location: filters.location === "" ? null : filters.location,
      date: filters.date === "" ? null : filters.date,
    },
  });
  return response.data;
};

export const activeDeactiveEmployeeApi = async (
  id: number
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/admin/active_inactive_employer/${id}`);
  return response.data;
};

export const activeDeactiveCandidateApi = async (
  id: number
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/admin/active_inactive_student/${id}`);
  return response.data;
};

export const activeDeactiveJobApi = async (
  id: string
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/admin/active_inactive_job/${id}`);
  return response.data;
};

export const activeDeactiveInternshipApi = async (
  id: string
): Promise<SuccessResponse> => {
  const response = await axios.put(
    `/api/admin/active_inactive_internship/${id}`
  );
  return response.data;
};

export const verifyEmployeeApi = async (
  id: number
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/admin/verify_employer/${id}`);
  return response.data;
};

export const getRecentJobsApi = async (): Promise<RecentJobsResponse> => {
  const response = await axios.get("/api/admin/recent_jobs");
  return response.data;
};

export const getRecentInternshipsApi =
  async (): Promise<RecentInternshipsResponse> => {
    const response = await axios.get("/api/admin/recent_internships");
    return response.data;
  };

export const deleteCandidateApi = async (
  id: string | undefined | number
): Promise<SuccessResponse> => {
  const response = await axios.delete(`/api/admin/delete_student/${id}`);
  return response.data;
};

export const deleteJobApi = async (
  id: string | undefined | number
): Promise<SuccessResponse> => {
  const response = await axios.delete(`/api/admin/delete_job/${id}`);
  return response.data;
};

export const deleteInternshipApi = async (
  id: string | undefined | number
): Promise<SuccessResponse> => {
  const response = await axios.delete(`/api/admin/delete_internship/${id}`);
  return response.data;
};

export const deleteEmployerApi = async (
  id: string | undefined | number
): Promise<SuccessResponse> => {
  const response = await axios.delete(`/api/admin/delete_employer/${id}`);
  return response.data;
};

export const getCandidateDetailApi = async (
  id: string | undefined | number
): Promise<CandidateDetailResponse> => {
  const response = await axios.get(`/api/admin/student/${id}`);
  return response.data;
};
