import { Router } from "express";
import { SubmissionController } from "../../controllers/submission.controller.js";
import { SubmissionService } from "../../services/submission.service.js";
import { SubmissionRepository } from "../../repositories/submission.repository.js";
import { TaskRepository } from "../../repositories/task.repository.js";

import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";
import { RoleName } from "../../types/role.type.js";

export const submissionRouter = Router({ mergeParams: true });

export const submissionController = new SubmissionController(
    new SubmissionService(
        new SubmissionRepository(),
        new TaskRepository()
    )
);

submissionRouter.get(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(taskIdSchema),
    submissionController.getTaskSubmissionsHandler.bind(submissionController)
);
// implement all the routers below