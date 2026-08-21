import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { IReviewService } from "../services/review.service.js";
import { AuthenticatedRequest } from "../types/express.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class ReviewController {
    private readonly reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this.reviewService = reviewService;
    }

    async getReviewHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req as AuthenticatedRequest;
            const submissionId = BigInt(req.params.submissionId as string);
            const review = await this.reviewService.getReviewBySubmissionId(submissionId, user);

            sendSuccess(res, review, StatusCodes.OK, "Review fetched successfully");
        } catch (error) {
            next(error);
        }
    }
}