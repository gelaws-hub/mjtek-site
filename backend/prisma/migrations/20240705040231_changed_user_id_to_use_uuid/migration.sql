/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `favorit` DROP FOREIGN KEY `Favorit_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `Keranjang_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `log_transaksi` DROP FOREIGN KEY `Log_Transaksi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `simulasi` DROP FOREIGN KEY `Simulasi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_id_user_fkey`;

-- AlterTable
ALTER TABLE `favorit` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `keranjang` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `log_transaksi` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `simulasi` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id_user` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_user`);

-- AddForeignKey
ALTER TABLE `Simulasi` ADD CONSTRAINT `Simulasi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Keranjang` ADD CONSTRAINT `Keranjang_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorit` ADD CONSTRAINT `Favorit_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log_Transaksi` ADD CONSTRAINT `Log_Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
