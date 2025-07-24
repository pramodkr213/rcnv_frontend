interface Internship {
  applicationDeadline: string;
  companyName: string;
  createdAt: string;
  duration: string;
  id: string;
  internshipType: string;
  isActive: true;
  isPaid: false;
  location: string;
  maxStipend: string;
  minStipend: string;
  mode: string;
  numberOfOpenings: number;
  title: string;
  industryType: string;
}

export interface InternshipsResponse {
  success: boolean;
  message: string;
  totalCount: number;
  data: Internship[];
  statusCode: number;
}
