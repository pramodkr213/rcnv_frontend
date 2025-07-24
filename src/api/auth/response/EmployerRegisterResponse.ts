import type {Employer} from "../../../types/Employer.ts";

export interface EmployerRegisterResponse {
    success: boolean,
    message: string,
    data: Employer,
    statusCode: number,
}