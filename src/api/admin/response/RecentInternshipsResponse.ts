interface Internship {
  companyName: string;
  createdAt: string;
  id: string;
  location: string;
  logo: string;
  title: string;
}

export interface RecentInternshipsResponse {
  success: boolean;
  message: string;
  data: Internship[];
  statusCode: number;
}
