import type {Student} from "../../../types/Student.ts";
import type {Employer} from "../../../types/Employer.ts";

export interface LoginResponse {
    success: boolean,
    message: string,
    data: Student | Employer,
    statusCode: number,
}