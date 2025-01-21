/*
  Warnings:

  - Added the required column `brand_id` to the `socket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `socket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `socket` ADD COLUMN `brand_id` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `release_date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `socket_brand_id_idx` ON `socket`(`brand_id`);

-- AddForeignKey
ALTER TABLE `socket` ADD CONSTRAINT `socket_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
