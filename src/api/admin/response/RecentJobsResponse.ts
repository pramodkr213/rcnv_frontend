interface Job {
  companyName: string;
  createdAt: string;
  id: string;
  location: string;
  logo: string;
  title: string;
}

export interface RecentJobsResponse {
  success: boolean;
  message: string;
  data: Job[];
  statusCode: number;
}
