import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";

import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";
import { reviewRouter } from "./review.route.js";


export const submissionRouter = Router({ mergeParams: true });

export const submissionController = new SubmissionController(
    new SubmissionService(
        new SubmissionRepository(),
        new TaskAssignmentRepository(),
        new TaskService(new TaskRepository())
    )
);

submissionRouter.get(
    "/",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    submissionController.getTaskSubmissionsHandler.bind(submissionController)
);

submissionRouter.use("/:submissionId/review", reviewRouter);

// implement all the routers below