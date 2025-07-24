import type { RegisterStudentRequest } from "./request/RegistrationStudentRequest.ts";
import type { LoginRequest } from "./request/LoginRequest.ts";
import type { MessageResponse } from "./response/MessageResponse.ts";
import type { RegisterStudentResponse } from "./response/RegistrationStudentResponse.ts";
import type { LoginResponse } from "./response/LoginResponse.ts";
import type { EmployerRegistrationRequest } from "./request/EmployerRegistrationRequest.ts";
import type { EmployerRegisterResponse } from "./response/EmployerRegisterResponse.ts";
import type { SendOtpRequest } from "./request/SendOtpRequest.ts";
import type { VerifyEmailRequest } from "./request/VerifyEmailRequest.ts";
import type {
  ProfileResponse,
  StduentProfileResponse,
} from "./response/ProfileResponse.ts";
import axios from "../axios.ts";

export const registerStudentApi = async (
  data: RegisterStudentRequest
): Promise<RegisterStudentResponse> => {
  const response = await axios.post("/api/auth/register/student", data);
  return response.data;
};

export const registerEmployerApi = async (
  data: EmployerRegistrationRequest
): Promise<EmployerRegisterResponse> => {
  const response = await axios.post("/api/auth/register/employer", data);
  return response.data;
};

export const registerCompanyApi = async (
  data: FormData
): Promise<EmployerRegisterResponse> => {
  const response = await axios.post("/api/employer/add-company", data);
  return response.data;
};

export const loginStudentApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login/student", data);
  return response.data;
};

export const loginEmployerApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login/employer", data);
  return response.data;
};

export const loginAdminApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login/admin  ", data);
  return response.data;
};

export const getProfileApi = async (): Promise<
  ProfileResponse | StduentProfileResponse
> => {
  const response = await axios.get("/api/user/profile");
  return response.data;
};

export const logoutApi = async (): Promise<MessageResponse> => {
  const response = await axios.post("/api/auth/logout", {});
  return response.data;
};

export const sendOtpApi = async (
  data: SendOtpRequest
): Promise<MessageResponse> => {
  const response = await axios.post(`/api/auth/send-otp?email=${data.email}`);
  return response.data;
};

export const verifyEmailApi = async (
  data: VerifyEmailRequest
): Promise<MessageResponse> => {
  const response = await axios.post(
    `/api/auth/verify-email?email=${data.email}&otp=${data.otp}`
  );
  return response.data;
};
