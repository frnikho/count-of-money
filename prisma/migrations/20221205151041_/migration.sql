/*
  Warnings:

  - You are about to drop the `CryptoList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CryptoList" DROP CONSTRAINT "CryptoList_cryptoId_fkey";

-- DropForeignKey
ALTER TABLE "CryptoList" DROP CONSTRAINT "CryptoList_userPreferenceId_fkey";

-- DropTable
DROP TABLE "CryptoList";
