/*
  Warnings:

  - A unique constraint covering the columns `[binanceId]` on the table `Crypto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "binanceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Crypto_binanceId_key" ON "Crypto"("binanceId");
