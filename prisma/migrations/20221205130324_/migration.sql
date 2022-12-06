-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "articlesToShow" INTEGER NOT NULL,
    "cryptoToShow" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_id_key" ON "Config"("id");
