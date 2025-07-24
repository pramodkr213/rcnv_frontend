interface Job {
  active: boolean;
  companyName: string;
  createdAt: string;
  id: string;
  location: string;
  maxExperience: number;
  maxSalary: number;
  minExperience: number;
  minSalary: number;
  numberOfVacancies: number;
  title: string;
  industryType: string;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  totalCount: number;
  data: Job[];
  statusCode: number;
}
