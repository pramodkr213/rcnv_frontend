export interface CompanyRequest {
  companyName: string;
  discription: string;
  city: string;
  industryType: string;
  noEmployees: string;
  website: string;
  smLink: string;
  isDocument: boolean;
}

export interface CompanyRegistrationRequest {
  name: string;
  description: string;
  city: string;
  industry: string;
  employees: string;
  logo: string | Blob | null;
  verification: string;
  noDocs: boolean;
  docFile: Blob | string | null;
  socialLink: string;
  websiteLink: string;
}
