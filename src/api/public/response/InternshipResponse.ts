import type { Internship } from "../../../types/Internship";

export interface InternshipResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Internship;
}
