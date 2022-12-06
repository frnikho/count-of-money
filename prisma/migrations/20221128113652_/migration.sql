/*
  Warnings:

  - Added the required column `image` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localization` to the `Crypto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market_data` to the `Crypto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "localization" JSONB NOT NULL,
ADD COLUMN     "market_data" JSONB NOT NULL;
