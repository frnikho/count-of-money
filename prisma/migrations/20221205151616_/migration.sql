-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "cryptoListId" TEXT;

-- CreateTable
CREATE TABLE "CryptoList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "userPreferenceId" TEXT,

    CONSTRAINT "CryptoList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoList_id_key" ON "CryptoList"("id");

-- AddForeignKey
ALTER TABLE "Crypto" ADD CONSTRAINT "Crypto_cryptoListId_fkey" FOREIGN KEY ("cryptoListId") REFERENCES "CryptoList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoList" ADD CONSTRAINT "CryptoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoList" ADD CONSTRAINT "CryptoList_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
