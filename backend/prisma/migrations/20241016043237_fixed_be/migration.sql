/*
  Warnings:

  - The primary key for the `brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_brand` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `nama_brand` on the `brand` table. All the data in the column will be lost.
  - The primary key for the `media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_media` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `id_produk` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sumber` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `tipe_file` on the `media` table. All the data in the column will be lost.
  - The primary key for the `socket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_socket` on the `socket` table. All the data in the column will be lost.
  - You are about to drop the column `nama_socket` on the `socket` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alamat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `no_hp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `detail_simulasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detail_transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keranjang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log_transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produk_socket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produk_tipe_ram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `simulasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subkategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipe_ram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaksi` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[brand_name]` on the table `brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[socket_name]` on the table `socket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand_name` to the `brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `socket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socket_name` to the `socket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `phone_number` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detail_simulasi` DROP FOREIGN KEY `Detail_Simulasi_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `detail_simulasi` DROP FOREIGN KEY `Detail_Simulasi_id_simulasi_fkey`;

-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `Detail_Transaksi_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `Detail_Transaksi_id_transaksi_fkey`;

-- DropForeignKey
ALTER TABLE `favorit` DROP FOREIGN KEY `Favorit_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `favorit` DROP FOREIGN KEY `Favorit_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `Keranjang_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `keranjang` DROP FOREIGN KEY `Keranjang_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `log_transaksi` DROP FOREIGN KEY `Log_Transaksi_id_transaksi_fkey`;

-- DropForeignKey
ALTER TABLE `log_transaksi` DROP FOREIGN KEY `Log_Transaksi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_brand_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_sub_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `produk_socket` DROP FOREIGN KEY `Produk_Socket_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `produk_socket` DROP FOREIGN KEY `Produk_Socket_id_socket_fkey`;

-- DropForeignKey
ALTER TABLE `produk_tipe_ram` DROP FOREIGN KEY `Produk_Tipe_RAM_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `produk_tipe_ram` DROP FOREIGN KEY `Produk_Tipe_RAM_id_tipe_ram_fkey`;

-- DropForeignKey
ALTER TABLE `simulasi` DROP FOREIGN KEY `Simulasi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_id_role_fkey`;

-- DropIndex
DROP INDEX `Brand_nama_brand_key` ON `brand`;

-- DropIndex
DROP INDEX `Socket_nama_socket_key` ON `socket`;

-- AlterTable
ALTER TABLE `brand` DROP PRIMARY KEY,
    DROP COLUMN `id_brand`,
    DROP COLUMN `nama_brand`,
    ADD COLUMN `brand_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `media` DROP PRIMARY KEY,
    DROP COLUMN `id_media`,
    DROP COLUMN `id_produk`,
    DROP COLUMN `sumber`,
    DROP COLUMN `tipe_file`,
    ADD COLUMN `file_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `source` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `socket` DROP PRIMARY KEY,
    DROP COLUMN `id_socket`,
    DROP COLUMN `nama_socket`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `socket_name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `alamat`,
    DROP COLUMN `id_role`,
    DROP COLUMN `id_user`,
    DROP COLUMN `no_hp`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `detail_simulasi`;

-- DropTable
DROP TABLE `detail_transaksi`;

-- DropTable
DROP TABLE `favorit`;

-- DropTable
DROP TABLE `kategori`;

-- DropTable
DROP TABLE `keranjang`;

-- DropTable
DROP TABLE `log_transaksi`;

-- DropTable
DROP TABLE `produk`;

-- DropTable
DROP TABLE `produk_socket`;

-- DropTable
DROP TABLE `produk_tipe_ram`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `simulasi`;

-- DropTable
DROP TABLE `subkategori`;

-- DropTable
DROP TABLE `tipe_ram`;

-- DropTable
DROP TABLE `transaksi`;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `sub_category_id` INTEGER NULL,
    `brand_id` INTEGER NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `description` TEXT NULL,
    `estimated_weight` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `product_category_id_idx`(`category_id`),
    INDEX `product_sub_category_id_idx`(`sub_category_id`),
    INDEX `product_brand_id_idx`(`brand_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_category_name_key`(`category_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_category_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sub_category_sub_category_name_key`(`sub_category_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_socket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `socket_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ram_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ram_type_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ram_type_ram_type_name_key`(`ram_type_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_ram_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `ram_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simulation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    INDEX `simulation_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `simulation_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `simulation_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    INDEX `simulation_detail_simulation_id_product_id_idx`(`simulation_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `date` DATETIME(3) NOT NULL,
    `is_selected` BOOLEAN NOT NULL DEFAULT true,

    INDEX `cart_product_id_idx`(`product_id`),
    INDEX `cart_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `total_items` INTEGER NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    INDEX `transaction_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `transaction_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,

    INDEX `transaction_detail_product_id_transaction_id_idx`(`product_id`, `transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `order_status` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `brand_brand_name_key` ON `brand`(`brand_name`);

-- CreateIndex
CREATE UNIQUE INDEX `socket_socket_name_key` ON `socket`(`socket_name`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_sub_category_id_fkey` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_socket` ADD CONSTRAINT `product_socket_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_socket` ADD CONSTRAINT `product_socket_socket_id_fkey` FOREIGN KEY (`socket_id`) REFERENCES `socket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_ram_type` ADD CONSTRAINT `product_ram_type_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_ram_type` ADD CONSTRAINT `product_ram_type_ram_type_id_fkey` FOREIGN KEY (`ram_type_id`) REFERENCES `ram_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulation` ADD CONSTRAINT `simulation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulation_detail` ADD CONSTRAINT `simulation_detail_simulation_id_fkey` FOREIGN KEY (`simulation_id`) REFERENCES `simulation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulation_detail` ADD CONSTRAINT `simulation_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_log` ADD CONSTRAINT `transaction_log_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_log` ADD CONSTRAINT `transaction_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
