import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import toast from "react-hot-toast";
import type { UserRole } from "../../types/UserRole.ts";
import type { RegisterStudentRequest } from "../../api/auth/request/RegistrationStudentRequest.ts";
import type { RegisterStudentResponse } from "../../api/auth/response/RegistrationStudentResponse.ts";
import type { EmployerRegistrationRequest } from "../../api/auth/request/EmployerRegistrationRequest.ts";
import type { EmployerRegisterResponse } from "../../api/auth/response/EmployerRegisterResponse.ts";
import type { LoginRequest } from "../../api/auth/request/LoginRequest.ts";
import type { LoginResponse } from "../../api/auth/response/LoginResponse.ts";
import type { MessageResponse } from "../../api/auth/response/MessageResponse.ts";
import type { ProfileResponse } from "../../api/auth/response/ProfileResponse.ts";
import type {
  CompanyRegistrationRequest,
  CompanyRequest,
} from "../../api/auth/request/CompanyRegistrationRequest.ts";
import type { Admin } from "../../types/Admin.ts";
import type { Employer } from "../../types/Employer.ts";
import type { Student } from "../../types/Student.ts";
import {
  getDecryptedAuthCookie,
  removeAuthCookie,
  setEncryptedAuthCookie,
} from "../../utils/cookieCrypto.ts";
import {
  getProfileApi,
  loginAdminApi,
  loginEmployerApi,
  loginStudentApi,
  logoutApi,
  registerCompanyApi,
  registerEmployerApi,
  registerStudentApi,
  sendOtpApi,
} from "../../api/auth/Auth.ts";

interface ProviderProps {
  children: React.ReactNode;
}

export interface UserState {
  userId: number | string | null;
  email: string | null;
  firstName: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isEmailVerified?: boolean;
  isApproved?: boolean;
  hasCompany?: boolean;
}

interface ContextState {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  registerStudent: (
    data: RegisterStudentRequest
  ) => Promise<RegisterStudentResponse>;
  registerEmployer: (
    data: EmployerRegistrationRequest
  ) => Promise<EmployerRegisterResponse>;
  login: (data: LoginRequest, role: UserRole) => Promise<LoginResponse>;
  logout: () => Promise<MessageResponse>;
  handleSendOtp: (email: string) => void;
  OAuthFetch: () => Promise<ProfileResponse>;
  registerCompany: (
    data: CompanyRegistrationRequest
  ) => Promise<EmployerRegisterResponse>;
  loading: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ContextState | undefined>(undefined);

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserState>({
    userId: null,
    email: null,
    firstName: null,
    role: null,
    isAuthenticated: false,
    isEmailVerified: false,
    isApproved: false,
    hasCompany: false,
  });

  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = getDecryptedAuthCookie();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const registerStudent = async (data: RegisterStudentRequest) => {
    setLoading(true);
    try {
      const response = await registerStudentApi(data);
      const loggedInUser: UserState = {
        userId: response?.data?.id,
        email: response?.data?.email,
        firstName: response?.data?.firstName,
        role: response?.data?.role as UserRole,
        isAuthenticated: true,
      };
      setUser(loggedInUser);
      setEncryptedAuthCookie(loggedInUser);
      return response;
    } catch (error) {
      console.error("Student registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerEmployer = async (data: EmployerRegistrationRequest) => {
    setLoading(true);
    try {
      const response = await registerEmployerApi(data);
      const loggedInUser: UserState = {
        userId: response?.data?.id,
        email: response?.data?.email,
        firstName: response?.data?.firstName,
        role: response?.data?.role as UserRole,
        isAuthenticated: true,
        isEmailVerified: response?.data?.emailVerified,
        isApproved: response?.data?.verified,
        hasCompany: !!response?.data?.companyName,
      };
      setUser(loggedInUser);
      setEncryptedAuthCookie(loggedInUser);
      return response;
    } catch (error) {
      console.error("Employer registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerCompany = async (data: CompanyRegistrationRequest) => {
    setLoading(true);
    try {
      const newFormData = new FormData();

      newFormData.append("logo", data.logo as File);
      newFormData.append("document", data.docFile as File);

      const companyRequest: CompanyRequest = {
        companyName: data.name,
        discription: data.description,
        city: data.city,
        industryType: data.industry,
        noEmployees: data.employees,
        website: data.websiteLink,
        smLink: data.socialLink,
        isDocument: !data.noDocs,
      };

      newFormData.append(
        "company",
        new Blob([JSON.stringify(companyRequest)], { type: "application/json" })
      );

      console.log(newFormData);

      const response = await registerCompanyApi(newFormData);

      const loggedInUser: UserState = {
        userId: response?.data?.id,
        email: response?.data?.email,
        firstName: response?.data?.firstName,
        role: response?.data?.role as UserRole,
        isAuthenticated: true,
        isEmailVerified: response?.data?.emailVerified,
        isApproved: response?.data?.verified,
        hasCompany: !!response?.data?.companyName,
      };

      setUser(loggedInUser);
      setEncryptedAuthCookie(loggedInUser);
      return response;
    } catch (error) {
      console.error("Employer registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest, role: UserRole) => {
    setLoading(true);
    try {
      let response: LoginResponse;
      let loggedInUser: UserState;

      if (role === "ADMIN") {
        response = await loginAdminApi(credentials);
        const admin = response?.data as Admin;
        loggedInUser = {
          userId: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          role: admin.role as UserRole,
          isAuthenticated: true,
        };
      } else if (role === "EMPLOYER") {
        response = await loginEmployerApi(credentials);
        const employer = response?.data as Employer;
        loggedInUser = {
          userId: employer.id,
          email: employer.email,
          firstName: employer.firstName,
          role: employer.role as UserRole,
          isAuthenticated: true,
          isEmailVerified: employer.emailVerified,
          isApproved: employer.verified,
          hasCompany: !!employer.companyName,
        };
      } else {
        response = await loginStudentApi(credentials);
        const student = response?.data as Student;
        loggedInUser = {
          userId: student.id,
          email: student.email,
          firstName: student.firstName,
          role: student.role as UserRole,
          isAuthenticated: true,
        };
      }

      setUser(loggedInUser);
      setEncryptedAuthCookie(loggedInUser);
      return response;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi();
      removeAuthCookie();
      setUser({
        userId: null,
        email: null,
        firstName: null,
        role: null,
        isAuthenticated: false,
      });
      return res;
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (email: string) => {
    setLoading(true);
    try {
      const res = await sendOtpApi({ email });
      toast.success(res.message);
    } catch (err) {
      console.error("Error sending OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const OAuthFetch = async () => {
    try {
      setLoading(true);
      const response = (await getProfileApi()) as ProfileResponse;

      if (response?.success) {
        const { id, email, firstName, role } = response.data;
        const loggedInUser = {
          userId: id,
          email,
          firstName,
          role,
          isAuthenticated: true,
        };

        setUser(loggedInUser as UserState);
        setEncryptedAuthCookie(loggedInUser);

        return response;
      } else {
        throw new Error(
          "Something went wrong. Please try again. If the problem persists, contact support."
        );
      }
    } catch (error) {
      console.error("OAuthFetch error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      registerStudent,
      registerEmployer,
      login,
      logout,
      handleSendOtp,
      OAuthFetch,
      registerCompany,
      loading,
      isLoginModalOpen,
      setIsLoginModalOpen,
    }),
    [user, loading, isLoginModalOpen]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): ContextState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
