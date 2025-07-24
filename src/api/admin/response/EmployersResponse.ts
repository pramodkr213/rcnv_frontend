interface Employer {
  city: string;
  companyname: string;
  createdAt: string;
  designation: string;
  email: string;
  firstname: string;
  id: number;
  industrytype: string;
  internshippostcount: number;
  isemailverified: true;
  jobpostcount: number;
  lastname: string;
  phone: string;
  active: boolean;
  verified: boolean;
}

export interface EmployersResponse {
  success: boolean;
  message: string;
  totalCount: number;
  data?: Employer[];
  employeeData?: Employer[];
  statusCode: number;
}
