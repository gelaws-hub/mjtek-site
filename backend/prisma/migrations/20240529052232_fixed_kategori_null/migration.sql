-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_sub_kategori_fkey`;

-- AlterTable
ALTER TABLE `produk` MODIFY `id_sub_kategori` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_id_sub_kategori_fkey` FOREIGN KEY (`id_sub_kategori`) REFERENCES `SubKategori`(`id_sub_kategori`) ON DELETE SET NULL ON UPDATE CASCADE;
