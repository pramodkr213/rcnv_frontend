export interface InternshipCard {
  id: number;
  title: string;
  companyName: string;
  internshipType: string;
  logo: string;
  location: string;
  minStipend: number;
  maxStipend: number;
  createdAt: string;
  isPaid: boolean;
  isApplied: boolean;
}
