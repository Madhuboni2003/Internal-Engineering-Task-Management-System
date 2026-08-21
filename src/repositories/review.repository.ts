import { prisma } from "../configs/db.config.js";
import {Review, Submission } from "../../generated/prisma/client.js";

export type ReviewWithSubmission = Review & { submission: Submission };

export interface IReviewRepository {
    findBySubmissionId(submissionId: bigint): Promise<ReviewWithSubmission | null>;
}

export class ReviewRepository implements IReviewRepository {
    async findBySubmissionId(submissionId: bigint): Promise<ReviewWithSubmission | null> {
        return prisma.review.findUnique({
            where: {
                submissionId,
            },
            include: {
                submission: true,
            },
        });
    }
}