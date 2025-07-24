interface Employer {
  email: string;
  companyName: string;
  discription: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  isFresher: boolean;
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
  employer: Employer;
  isApplied: boolean;
  isBookmark: boolean;
  numberOfApplications: number;
}
