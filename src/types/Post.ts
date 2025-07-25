export type Post = {
  jobTitle: string;
  experienceMin: string;
  experienceMax: string;
  skills: string;
  jobType: string;
  jobCity: string;
  jobDays: string;
  timeType: string;
  openings: string;
  description: string;
  salaryMin: string;
  salaryMax: string;
  salaryType: "year" | "month";
  internshipTitle: string;
  internshipSkills: string;
  internshipType: string;
  internshipCity: string;
  internshipDays: string;
  internshipTime: string;
  internshipOpenings: string;
  internshipStart: string;
  startDateFrom: string;
  startDateTo: string;
  duration: string;
  durationUnit: "month" | "week";
  responsibilities: string;
  stipendType: string;
  stipendMin: string;
  stipendMax: string;
  internshipSalaryType: "year" | "month" | "week";
  experienceType: "fresher" | "experienced";
  lastApplyDateJob: string;
  lastApplyDateInternship: string;
  sector: string; // New field added for sector
};
