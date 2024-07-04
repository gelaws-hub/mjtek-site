/*
  Warnings:

  - You are about to drop the `detail_cpu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detail_motherboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detail_ram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detail_cpu` DROP FOREIGN KEY `Detail_CPU_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `detail_cpu` DROP FOREIGN KEY `Detail_CPU_id_socket_fkey`;

-- DropForeignKey
ALTER TABLE `detail_motherboard` DROP FOREIGN KEY `Detail_Motherboard_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `detail_motherboard` DROP FOREIGN KEY `Detail_Motherboard_id_socket_fkey`;

-- DropForeignKey
ALTER TABLE `detail_motherboard` DROP FOREIGN KEY `Detail_Motherboard_id_tipe_ram_fkey`;

-- DropForeignKey
ALTER TABLE `detail_ram` DROP FOREIGN KEY `Detail_RAM_id_produk_fkey`;

-- DropForeignKey
ALTER TABLE `detail_ram` DROP FOREIGN KEY `Detail_RAM_id_tipe_ram_fkey`;

-- DropTable
DROP TABLE `detail_cpu`;

-- DropTable
DROP TABLE `detail_motherboard`;

-- DropTable
DROP TABLE `detail_ram`;

-- CreateTable
CREATE TABLE `Produk_Socket` (
    `id_produk_socket` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produk` INTEGER NOT NULL,
    `id_socket` INTEGER NOT NULL,

    PRIMARY KEY (`id_produk_socket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produk_Tipe_RAM` (
    `id_produk_ram` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produk` INTEGER NOT NULL,
    `id_tipe_ram` INTEGER NOT NULL,

    PRIMARY KEY (`id_produk_ram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produk_Socket` ADD CONSTRAINT `Produk_Socket_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk_Socket` ADD CONSTRAINT `Produk_Socket_id_socket_fkey` FOREIGN KEY (`id_socket`) REFERENCES `Socket`(`id_socket`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk_Tipe_RAM` ADD CONSTRAINT `Produk_Tipe_RAM_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk_Tipe_RAM` ADD CONSTRAINT `Produk_Tipe_RAM_id_tipe_ram_fkey` FOREIGN KEY (`id_tipe_ram`) REFERENCES `Tipe_RAM`(`id_tipe_ram`) ON DELETE RESTRICT ON UPDATE CASCADE;
