import { Request, Response, NextFunction } from "express";

import { ICommentService } from "../services/comment.service.js";

export class CommentController {
    private readonly commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    async createCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async getAllCommentsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async getCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async updateCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}

    async deleteCommentHandler(req: Request, res: Response, next: NextFunction): Promise<void> {}
}