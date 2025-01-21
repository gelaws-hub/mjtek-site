-- AlterTable
ALTER TABLE `user` ADD COLUMN `reset_password_expires` DATETIME(3) NULL,
    ADD COLUMN `reset_password_token` VARCHAR(191) NULL;
