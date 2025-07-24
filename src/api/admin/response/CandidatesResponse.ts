interface Candidate {
  city: string;
  companyName: string;
  createdAt: string;
  designation: string;
  email: string;
  firstName: string;
  id: number;
  industryType: string;
  internshipPostCount: number;
  isEmailVerified: boolean;
  jobPostCount: number;
  lastName: string;
  phone: string;
  verified: boolean;
  active: boolean;
  resumeLink: string;
}

export interface CandidatesResponse {
  success: boolean;
  message: string;
  totalCount: number;
  data: Candidate[];
  statusCode: number;
  studentData: Candidate[];
}
