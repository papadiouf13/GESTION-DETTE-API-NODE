/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_telephone_key" ON "Client"("telephone");
