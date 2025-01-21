/*
  Warnings:

  - You are about to drop the column `description` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `transaction_log` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_time` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction_log` DROP FOREIGN KEY `transaction_log_transaction_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_log` DROP FOREIGN KEY `transaction_log_user_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `description`,
    ADD COLUMN `end_time` DATETIME(3) NOT NULL,
    ADD COLUMN `start_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `transaction_log`;
