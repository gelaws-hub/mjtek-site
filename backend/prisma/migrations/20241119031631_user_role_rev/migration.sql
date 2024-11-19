/*
  Warnings:

  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `profile_pic` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_role_id_fkey`;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`role_name`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_id`,
    ADD COLUMN `profile_pic` VARCHAR(191) NOT NULL,
    ADD COLUMN `role_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_refresh_token` MODIFY `refresh_token` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_name_fkey` FOREIGN KEY (`role_name`) REFERENCES `role`(`role_name`) ON DELETE RESTRICT ON UPDATE CASCADE;
