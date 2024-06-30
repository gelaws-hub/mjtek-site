/*
  Warnings:

  - You are about to drop the column `idDeleted` on the `produk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `idDeleted`,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
