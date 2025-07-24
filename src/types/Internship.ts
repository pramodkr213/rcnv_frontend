interface Employer {
  email: string;
  companyName: string;
  discription: string;
}

export interface Internship {
  id: number;
  title: string;
  internshipDescription: string;
  isPaid: boolean;
  location: string;
  mode: string;
  skillsRequired: string;
  minStipend: number;
  maxStipend: number;
  numberOfOpenings: number;
  internshipType: string;
  postedBy: string;
  joinFrom: string;
  joinTo: string;
  isImmediate: boolean;
  isApplied: boolean;
  employer: Employer;
  numberOfApplications: number;
}
