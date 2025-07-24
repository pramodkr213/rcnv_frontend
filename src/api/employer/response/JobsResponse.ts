export interface JobTableEntry {
  id: string;
  title: string;
  location: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  createdAt: string;
  fresher: boolean;
  numberOfApplications: number;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: JobTableEntry[];
  statusCode: number;
}
