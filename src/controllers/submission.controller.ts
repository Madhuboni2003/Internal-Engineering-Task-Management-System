import { Request, Response, NextFunction } from "express";
import { ISubmissionService } from "../services/submission.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";

export class SubmissionController {
    private readonly submissionService: ISubmissionService; 

    constructor(submissionService: ISubmissionService) {
        this.submissionService = submissionService;
    }

    async createSubmissionHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }

    async getTaskSubmissionsHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.taskId as string;
            const { user } = req as AuthenticatedRequest;

            const submissions = await this.submissionService.findTaskSubmissions(BigInt(taskId), user.userId, user.role);

            sendSuccess(res, submissions, 200, "Submissions fetched successfully");
        } catch (error) {
            next(error);
        }
    }
}