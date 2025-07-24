interface Education {
  college: string;
  degree: string;
  fieldOfStudy: string;
  id: string;
  type: string;
  yearOfPassing: string;
}

interface CandidateDetail {
  aboutMe: string;
  active: boolean;
  careerObjective: string;
  city: string;
  country: string;
  createdAt: string;
  dob: string;
  email: string;
  firstName: string;
  education: Education[];
  gender: string;
  githubProfile: string;
  id: string;
  lanuagesKnown: string;
  lastName: string;
  linkedinProfile: string;
  phone: string;
  portfolio: string;
  profilePicture: string;
  resumeLink: string;
  role: string;
  skills: string;
  state: string;
  updatedAt: string;
}

export interface CandidateDetailResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: CandidateDetail;
}
