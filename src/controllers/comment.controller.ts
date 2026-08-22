import { Request, Response, NextFunction } from "express";

import { ICommentService } from "../services/comment.service.js";
import { AuthenticatedRequest } from "../types/express.js";
import { TaskIdDto } from "../dtos/task.dto.js";
import { CommentIdDto } from "../dtos/comment.dto.js";
import { RoleName } from "../types/role.type.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";


export class CommentController {
    private readonly commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    async createCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async getAllCommentsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req as AuthenticatedRequest;
            const { taskId } = req.params as unknown as TaskIdDto;

            const comments = user.role === RoleName.ADMIN
                ? await this.commentService.getAllComments(taskId, user)
                : await this.commentService.getComment(taskId, user);

            sendSuccess(res, comments, 200, "Comments fetched successfully");
        } catch (error) {
            next(error);
        }
    }

    async getCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async updateCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async deleteCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req as AuthenticatedRequest;
            const { commentId } = req.params as unknown as CommentIdDto;

            await this.commentService.deleteComment(commentId, user);

            sendSuccess(res, null, 200, "Comment deleted successfully");
        } catch (error) {
            next(error);
        }
    }
}