import { Router } from "express";

import { CommentController } from "../../controllers/comment.controller.js";
import { CommentService } from "../../services/comment.service.js";
import { CommentRepository } from "../../repositories/comment.repository.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { taskIdSchema } from "../../dtos/task.dto.js";
import { commentIdSchema } from "../../dtos/comment.dto.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";

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
    authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
    validateRequestParams(taskIdSchema),
    commentController.getAllCommentsHandler.bind(commentController)
);

export const commentIdRouter = Router();

commentIdRouter.delete(
    "/:commentId",
    authenticateUser,
    authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
    validateRequestParams(commentIdSchema),
    commentController.deleteCommentHandler.bind(commentController)
);

// implement all the routes below