/*
  Warnings:

  - The values [IN_REVIEW,CHANGES_REQUESTED] on the enum `tasks_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'READY_FOR_REVIEW', 'COMPLETED', 'REOPENED') NOT NULL DEFAULT 'TODO';
