/*
  Warnings:

  - Made the column `photo` on table `Article` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "photo" SET NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "photo" SET NOT NULL;
