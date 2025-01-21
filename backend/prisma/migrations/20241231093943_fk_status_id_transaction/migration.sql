-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `status_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `transaction_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
