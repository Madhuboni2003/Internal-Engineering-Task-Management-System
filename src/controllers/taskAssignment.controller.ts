import { Request, Response, NextFunction } from "express";

import { ITaskAssignmentService } from "../services/taskAssignment.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class TaskAssignmentController {
    private readonly taskAssignmentService: ITaskAssignmentService;

    constructor(taskAssignmentService: ITaskAssignmentService) {
        this.taskAssignmentService = taskAssignmentService;
    }

    async assignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }

    async reAssignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }

    async unAssignTaskHandler(req: Request, res: Response, next: NextFunction) {
        // implement properly
    }
    async getAssignmentHistoryHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = BigInt(req.params.taskId as string);

        const assignments =
            await this.taskAssignmentService.getAssignmentHistory(taskId);

        sendSuccess(
            res,
            assignments,
            200,
            "Task assignment history fetched successfully"
        );
    } catch (error) {
        next(error);
    }
}
}