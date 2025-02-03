-- AlterTable
ALTER TABLE `product` ADD COLUMN `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `editedTime` DATETIME(3) NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL DEFAULT 'admin-root-id';

-- CreateIndex
CREATE INDEX `product_user_id_idx` ON `product`(`user_id`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
