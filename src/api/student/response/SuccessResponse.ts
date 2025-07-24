export interface SuccessResponse {
  success: boolean;
  message: string;
  data: unknown;
  statusCode: number;
}

// Student Dashboard Response Types
export interface StudentDashboardResponse {
  success: boolean;
  message: string;
  data: {
    totalApplications: number;
    totalBookmarks: number;
    profileCompletion: number;
    recentApplications: ApplicationItem[];
    recentBookmarks: BookmarkItem[];
    profileStats: ProfileStats;
  };
  statusCode: number;
}

export interface ApplicationItem {
  id: string;
  type: "job" | "internship";
  title: string;
  company: string;
  status: "pending" | "shortlisted" | "selected" | "rejected";
  appliedDate: string;
  location: string;
  salary?: string;
  stipend?: string;
}

export interface BookmarkItem {
  id: string;
  type: "job" | "internship";
  title: string;
  company: string;
  location: string;
  salary?: string;
  stipend?: string;
  bookmarkedDate: string;
}

export interface ProfileStats {
  profileCompletion: number;
  resumeUploaded: boolean;
  educationCount: number;
  skillsCount: number;
  lastUpdated: string;
}
