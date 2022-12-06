/*
  Warnings:

  - You are about to drop the column `cryptoListId` on the `Crypto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Crypto" DROP CONSTRAINT "Crypto_cryptoListId_fkey";

-- AlterTable
ALTER TABLE "Crypto" DROP COLUMN "cryptoListId";

-- CreateTable
CREATE TABLE "_CryptoToCryptoList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CryptoToCryptoList_AB_unique" ON "_CryptoToCryptoList"("A", "B");

-- CreateIndex
CREATE INDEX "_CryptoToCryptoList_B_index" ON "_CryptoToCryptoList"("B");

-- AddForeignKey
ALTER TABLE "_CryptoToCryptoList" ADD CONSTRAINT "_CryptoToCryptoList_A_fkey" FOREIGN KEY ("A") REFERENCES "Crypto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CryptoToCryptoList" ADD CONSTRAINT "_CryptoToCryptoList_B_fkey" FOREIGN KEY ("B") REFERENCES "CryptoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
