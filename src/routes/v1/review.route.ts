import { Router } from "express";

import { ReviewController } from "../../controllers/review.controller.js";
import { ReviewService } from "../../services/review.service.js";
import { ReviewRepository } from "../../repositories/review.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { validateRequestParams } from "../../middlewares/validate.middleware.js";
import { submissionIdSchema } from "../../dtos/submission.dto.js";
import { RoleName } from "../../types/role.type.js";

export const reviewRouter = Router({ mergeParams: true });

const reviewController = new ReviewController(
    new ReviewService(
        new ReviewRepository()
    )
);

reviewRouter.get(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
    validateRequestParams(submissionIdSchema),
    reviewController.getReviewHandler.bind(reviewController)
);