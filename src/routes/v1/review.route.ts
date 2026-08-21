import { Router } from "express";

import { ReviewController } from "../../controllers/review.controller.js";
import { ReviewService } from "../../services/review.service.js";
import { ReviewRepository } from "../../repositories/review.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { submissionIdSchema } from "../../dtos/submission.dto.js";

export const reviewRouter = Router({ mergeParams: true });

const reviewController = new ReviewController(
    new ReviewService(
        new ReviewRepository()
    )
);

reviewRouter.get(
    "/",
    authenticateUser,
    validateRequestParams(submissionIdSchema),
    reviewController.getReviewHandler.bind(reviewController)
);