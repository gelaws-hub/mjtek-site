/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `favorite_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `media_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_ram_type` DROP FOREIGN KEY `product_ram_type_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_socket` DROP FOREIGN KEY `product_socket_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `simulation_detail` DROP FOREIGN KEY `simulation_detail_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction_detail` DROP FOREIGN KEY `transaction_detail_product_id_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `favorite` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `media` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `product_ram_type` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_socket` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `simulation_detail` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction_detail` MODIFY `product_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `product_socket` ADD CONSTRAINT `product_socket_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_ram_type` ADD CONSTRAINT `product_ram_type_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `simulation_detail` ADD CONSTRAINT `simulation_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
