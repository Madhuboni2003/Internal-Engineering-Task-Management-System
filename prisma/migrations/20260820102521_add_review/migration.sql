-- CreateTable
CREATE TABLE `reviews` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `submission_id` BIGINT NOT NULL,
    `reviewed_by` BIGINT NOT NULL,
    `requirement_analysis_score` TINYINT NOT NULL,
    `code_quality_score` TINYINT NOT NULL,
    `code_correctness_score` TINYINT NOT NULL,
    `testing_score` TINYINT NOT NULL,
    `delivery_timing_score` TINYINT NOT NULL,
    `pr_commit_quality_score` TINYINT NOT NULL,
    `feedback` TEXT NULL,
    `decision` ENUM('APPROVED', 'CHANGES_REQUESTED') NOT NULL,
    `reviewed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `reviews_submission_id_key`(`submission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_submission_id_fkey` FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewed_by_fkey` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
