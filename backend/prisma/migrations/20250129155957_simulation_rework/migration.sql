/*
  Warnings:

  - You are about to drop the column `date` on the `simulation` table. All the data in the column will be lost.
  - You are about to drop the `simulation_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `modifiedAt` to the `simulation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `simulation_detail` DROP FOREIGN KEY `simulation_detail_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `simulation_detail` DROP FOREIGN KEY `simulation_detail_simulation_id_fkey`;

-- AlterTable
ALTER TABLE `simulation` DROP COLUMN `date`,
    ADD COLUMN `modifiedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `simulation_data` JSON NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `simulation_detail`;
