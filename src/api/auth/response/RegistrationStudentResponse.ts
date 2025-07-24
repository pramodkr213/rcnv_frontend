import type {Student} from "../../../types/Student.ts";

export interface RegisterStudentResponse {
    success: boolean,
    message: string,
    data: Student,
    statusCode: number,
}