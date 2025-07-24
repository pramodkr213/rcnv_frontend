import type { Education } from "../../../types/Education.ts";
import type { Student } from "../../../types/Student.ts";

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: Student;
  statusCode: number;
}

interface StudentProfile {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  careerObjective: string;
  aboutMe: string;
  lanuagesKnown: string;
  linkedinProfile: string;
  githubProfile: string;
  portfolio: string;
  email: string;
  profilePicture: string;
  resumeLink: string;
  education: Education[];
}

export interface StduentProfileResponse {
  success: boolean;
  message: string;
  data: StudentProfile;
  statusCode: number;
}
