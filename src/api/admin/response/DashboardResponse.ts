interface Dashboard {
  totalStudents: number;
  totalEmployers: number;
  totalJobs: number;
  totalInternships: number;
  totalApplications: number;
  totalPendingEmployerRequests: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: Dashboard;
  statusCode: number;
}
