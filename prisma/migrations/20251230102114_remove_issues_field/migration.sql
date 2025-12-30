/*
  Warnings:

  - You are about to drop the column `feedback` on the `quality_scores` table. All the data in the column will be lost.
  - You are about to drop the column `issues` on the `task_metadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "quality_scores" DROP COLUMN "feedback";

-- AlterTable
ALTER TABLE "task_metadata" DROP COLUMN "issues";
