/*
  Warnings:

  - The values [CHANGES_REQUESTED] on the enum `reviews_decision` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `decision` ENUM('APPROVED', 'CHANGES_REQUIRED') NOT NULL;
