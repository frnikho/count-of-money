/*
  Warnings:

  - You are about to drop the column `createdById` on the `Source` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_createdById_fkey";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "createdById";
