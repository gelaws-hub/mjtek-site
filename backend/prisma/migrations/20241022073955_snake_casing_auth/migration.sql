-- /*
--   Warnings:

--   - You are about to drop the column `faEnable` on the `user` table. All the data in the column will be lost.
--   - You are about to drop the column `faSecret` on the `user` table. All the data in the column will be lost.
--   - You are about to drop the `userrefreshtoken` table. If the table is not empty, all the data it contains will be lost.

-- */
-- DropForeignKey
ALTER TABLE `userRefreshToken` DROP FOREIGN KEY `userRefreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `faEnable`,
    DROP COLUMN `faSecret`,
    ADD COLUMN `fa_enable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `fa_secret` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `userRefreshToken`;

-- CreateTable
CREATE TABLE `user_refresh_token` (
    `id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_refresh_token` ADD CONSTRAINT `user_refresh_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
