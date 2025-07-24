import type { Education } from "../../types/Education";
import axios from "../axios";
import type { UpdateStudentProfile } from "./request/UpdateProfileRequest";
import type { ApplyInternshipResponse } from "./response/ApplyInternshipResponse";
import type { ApplyJobResponse } from "./response/ApplyJobResponse";
import type { SuccessResponse } from "./response/SuccessResponse";

export const applyJobApi = async (
  jobId: string | undefined
): Promise<ApplyJobResponse> => {
  const response = await axios.get(`/api/student/job/${jobId}/applyJob`);
  return response.data;
};

export const applyInternshipApi = async (
  id: string | undefined
): Promise<ApplyInternshipResponse> => {
  const response = await axios.get(`/api/student/internships/${id}/apply`);
  return response.data;
};

export const updateProfileApi = async (
  data: UpdateStudentProfile
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/student/profile/update`, data);
  return response.data;
};

export const addEducationApi = async (
  data: Education
): Promise<SuccessResponse> => {
  const response = await axios.post(`/api/student/education/add`, data);
  return response.data;
};

export const uploadResumeApi = async (
  data: FormData
): Promise<SuccessResponse> => {
  const response = await axios.post(`/api/student/uploadResume`, data);
  return response.data;
};

export const uploadProfilePictureApi = async (
  data: FormData
): Promise<SuccessResponse> => {
  const response = await axios.post(`/api/student/uploadProfilePicture`, data);
  return response.data;
};

export const updateEducationApi = async (
  id: string,
  data: Education
): Promise<SuccessResponse> => {
  const response = await axios.put(`/api/student/education/update/${id}`, data);
  return response.data;
};

export const deleteEducationApi = async (
  id: string | undefined
): Promise<SuccessResponse> => {
  const response = await axios.delete(`/api/student/education/delete/${id}`);
  return response.data;
};

// Dashboard API endpoints
export const getStudentDashboardApi = async () => {
  const response = await axios.get("/api/student/dashboard");
  return response.data;
};

export const getStudentApplicationsApi = async () => {
  const response = await axios.get("/api/student/applications");
  return response.data;
};

export const getStudentBookmarksApi = async () => {
  const response = await axios.get("/api/student/bookmarkedJobs");
  return response.data;
};

export const getStudentProfileStatsApi = async () => {
  const response = await axios.get("/api/student/profile-stats");
  return response.data;
};
