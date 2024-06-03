/*
  Warnings:

  - You are about to drop the column `id_kategori` on the `subkategori` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subkategori` DROP FOREIGN KEY `SubKategori_id_kategori_fkey`;

-- AlterTable
ALTER TABLE `subkategori` DROP COLUMN `id_kategori`;
