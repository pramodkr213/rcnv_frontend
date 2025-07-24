interface Stats {
  totalApplications: number;
  totalInternships: number;
  totalJobs: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: Stats;
  statusCode: number;
}
