import { Review } from "../../generated/prisma/client.js";
import { IReviewRepository } from "../repositories/review.repository.js";
import { AuthUser } from "../types/auth.type.js";
import { RoleName } from "../types/role.type.js";
import { NotfoundError, UnauthorizedError } from "../utils/errors/app.error.js";

export type ReviewWithPercentage = Review & { reviewPercentage: number };

export interface IReviewService {
    getReviewBySubmissionId(submissionId: bigint, requestingUser: AuthUser): Promise<ReviewWithPercentage>;
}

export class ReviewService implements IReviewService {
    private readonly reviewRepository: IReviewRepository;

    constructor(reviewRepository: IReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async getReviewBySubmissionId(submissionId: bigint, requestingUser: AuthUser): Promise<ReviewWithPercentage> {
        const review = await this.reviewRepository.findBySubmissionId(submissionId);

        if (!review) {
            throw new NotfoundError("Review not found for this submission");
        }

        const isAdmin = requestingUser.role === RoleName.ADMIN;
        const isOwner = review.submission.submittedBy === requestingUser.userId;

        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError("You are not allowed to view this review");
        }

        const { submission, ...reviewFields } = review;

        const totalScore =
            review.requirementAnalysisScore +
            review.codeQualityScore +
            review.codeCorrectnessScore +
            review.testingScore +
            review.deliveryTimingScore +
            review.prCommitQualityScore;

        const reviewPercentage = Math.round((totalScore / 60) * 100 * 100) / 100;

        return { ...reviewFields, reviewPercentage };
    }
}