-- AlterTable
ALTER TABLE `user` ADD COLUMN `refresh_token` VARCHAR(191) NULL,
    MODIFY `id_role` INTEGER NOT NULL DEFAULT 1;
