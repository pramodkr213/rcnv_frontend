export interface JobCard {
  id: number;
  title: string;
  companyName: string;
  jobType: string;
  logo: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  minExperience: number;
  maxExperience: number;
  createdAt: string;
  isApplied: boolean;
}
