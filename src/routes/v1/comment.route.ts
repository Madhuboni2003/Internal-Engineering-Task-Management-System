import { Router } from "express";

import { CommentController } from "../../controllers/comment.controller.js";
import { CommentService } from "../../services/comment.service.js";
import { CommentRepository } from "../../repositories/comment.repository.js";

const commentController = new CommentController(new CommentService(new CommentRepository()));

export const commentRouter = Router();

// implement all the routes below