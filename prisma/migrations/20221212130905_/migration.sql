-- AlterTable
ALTER TABLE "Crypto" ADD COLUMN     "configId" TEXT;

-- AddForeignKey
ALTER TABLE "Crypto" ADD CONSTRAINT "Crypto_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config"("id") ON DELETE SET NULL ON UPDATE CASCADE;
