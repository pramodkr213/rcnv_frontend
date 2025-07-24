export interface InternshipTableEntry {
  id: string;
  title: string;
  location: string;
  minExperience: number;
  maxExperience: number;
  minStipend: number;
  maxStipend: number;
  createdAt: string;
  isPaid: boolean;
  numberOfApplications: number;
}

export interface InternshipsResponse {
  success: boolean;
  message: string;
  data: InternshipTableEntry[];
  statusCode: number;
}
