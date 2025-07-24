import type {JobCard} from "../../../types/JobCard.ts";

export interface JobsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: JobCard[];
}