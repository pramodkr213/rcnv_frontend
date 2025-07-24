import type { InternshipCard } from "../../../types/InternshipCard";

export interface InternshipsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: InternshipCard[];
}
