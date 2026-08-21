import { Router } from "express";

import { CommentController } from "../../controllers/comment.controller.js";
import { CommentService } from "../../services/comment.service.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";

const commentController = new CommentController(
    new CommentService(
        new CommentRepository(),
        new TaskRepository(),
        new TaskAssignmentRepository()
    ));

export const commentRouter = Router({ mergeParams: true });

commentRouter.get(
    "/comments",
    authenticateUser,
    validateRequestParams(taskIdSchema),
    commentController.getAllCommentsHandler.bind(commentController)
);
// implement all the routes below