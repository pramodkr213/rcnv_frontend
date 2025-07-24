import type { Project } from "../../project";

interface Applicant {
  city: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  resumeLink: string;
}

interface Job {
  id: number;
  location: string;
  title: string;
  minExperience: number;
  maxExperience: number;
}

interface company {
  id: string;
  companyName: string;
}

interface Internship {
  title: string;
  location: string;
  minStipend: number;
  maxStipend: number;
}

interface Application {
  applicant: Applicant;
  appliedAt: string;
  id: number;
  company?: company;
  internship?: Internship;
  job?: Job;
  status: boolean;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: Project[];
  totalCount: number;
  statusCode: number;
}


export interface ApplicationsResponse {
  success: boolean;
  message: string;
  data: Application[];
  totalCount: number;
  statusCode: number;
}
