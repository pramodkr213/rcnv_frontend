export interface InternshipPostRequest {
  title: string;
  duration: string;
  paid: boolean;
  minStipend: number;
  maxStipend: number;
  mode: string;
  location: string;
  intershipType: string;
  skillsRequired: string;
  numberOfOpenings: number;
  isImmediate: boolean;
  joinFrom: string;
  joinTo: string;
  internshipDescription: string;
  postedBy: string;
  applicationDeadline: string;
}
