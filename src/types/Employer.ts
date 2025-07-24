export interface Employer {
  id: number | string | null;
  email: string | null;
  firstName: string | null;
  role: string | null;
  companyName: string | null;
  emailVerified: boolean;
  verified: boolean;
}
