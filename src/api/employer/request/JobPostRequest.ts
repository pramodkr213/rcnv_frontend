export interface JobPostRequest {
  title: string;
  description: string;
  minExperience: number;
  maxExperience: number;
  location: string;
  jobType: string;
  mode: string;
  skills: string;
  minSalary: number;
  maxSalary: number;
  numOfWorkingDays: number;
  numberOfVacancies: number;
  postedBy: string;
  fresher: boolean;
  lastDate: string;
  sector: string; // New field added for sector
}
