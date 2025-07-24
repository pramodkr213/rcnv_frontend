import type {Job} from "../../../types/Job.ts";

export interface JobResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Job;
}