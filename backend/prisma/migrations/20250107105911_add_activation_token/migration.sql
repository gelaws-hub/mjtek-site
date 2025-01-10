/*
  Warnings:

  - You are about to drop the column `fa_enable` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fa_secret` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `fa_enable`,
    DROP COLUMN `fa_secret`,
    ADD COLUMN `activation_token` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT false;
