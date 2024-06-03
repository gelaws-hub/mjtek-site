-- CreateTable
CREATE TABLE `Produk` (
    `id_produk` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `id_sub_kategori` INTEGER NOT NULL,
    `id_brand` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `harga` DECIMAL(10, 2) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `est_berat` DECIMAL(10, 2) NOT NULL,
    `stok` INTEGER NOT NULL,

    INDEX `Produk_id_kategori_idx`(`id_kategori`),
    INDEX `Produk_id_sub_kategori_idx`(`id_sub_kategori`),
    INDEX `Produk_id_brand_idx`(`id_brand`),
    PRIMARY KEY (`id_produk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategori_nama_kategori_key`(`nama_kategori`),
    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubKategori` (
    `id_sub_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `nama_sub_kategori` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubKategori_nama_sub_kategori_key`(`nama_sub_kategori`),
    PRIMARY KEY (`id_sub_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id_brand` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_brand` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Brand_nama_brand_key`(`nama_brand`),
    PRIMARY KEY (`id_brand`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Socket` (
    `id_socket` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_socket` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Socket_nama_socket_key`(`nama_socket`),
    PRIMARY KEY (`id_socket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_RAM` (
    `id_produk` INTEGER NOT NULL,
    `id_tipe_ram` INTEGER NOT NULL,

    PRIMARY KEY (`id_produk`, `id_tipe_ram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_CPU` (
    `id_produk` INTEGER NOT NULL,
    `id_socket` INTEGER NOT NULL,

    PRIMARY KEY (`id_produk`, `id_socket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Motherboard` (
    `id_produk` INTEGER NOT NULL,
    `id_socket` INTEGER NOT NULL,
    `id_tipe_ram` INTEGER NOT NULL,

    PRIMARY KEY (`id_produk`, `id_socket`, `id_tipe_ram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipe_RAM` (
    `id_tipe_ram` INTEGER NOT NULL AUTO_INCREMENT,
    `tipe_ram` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tipe_RAM_tipe_ram_key`(`tipe_ram`),
    PRIMARY KEY (`id_tipe_ram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Simulasi` (
    `id_simulasi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    INDEX `Simulasi_id_user_idx`(`id_user`),
    PRIMARY KEY (`id_simulasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Simulasi` (
    `id_simulasi` INTEGER NOT NULL,
    `id_produk` INTEGER NOT NULL,

    PRIMARY KEY (`id_simulasi`, `id_produk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `user_nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `unique_email`(`email`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Keranjang` (
    `id_keranjang` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produk` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    INDEX `Keranjang_id_produk_idx`(`id_produk`),
    INDEX `Keranjang_id_user_idx`(`id_user`),
    PRIMARY KEY (`id_keranjang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `status_pesanan` INTEGER NOT NULL,
    `total_barang` INTEGER NOT NULL,
    `harga_total` DECIMAL(10, 2) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    INDEX `Transaksi_id_user_idx`(`id_user`),
    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Transaksi` (
    `id_produk` INTEGER NOT NULL,
    `id_transaksi` INTEGER NOT NULL,
    `jumlah_produk` INTEGER NOT NULL,
    `jumlah_harga` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_produk`, `id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `unique_email`(`email`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PemilikToko` (
    `id_pemilik` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `unique_email`(`email`),
    UNIQUE INDEX `PemilikToko_email_key`(`email`),
    PRIMARY KEY (`id_pemilik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_id_sub_kategori_fkey` FOREIGN KEY (`id_sub_kategori`) REFERENCES `SubKategori`(`id_sub_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `Brand`(`id_brand`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubKategori` ADD CONSTRAINT `SubKategori_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_RAM` ADD CONSTRAINT `Detail_RAM_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_RAM` ADD CONSTRAINT `Detail_RAM_id_tipe_ram_fkey` FOREIGN KEY (`id_tipe_ram`) REFERENCES `Tipe_RAM`(`id_tipe_ram`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_CPU` ADD CONSTRAINT `Detail_CPU_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_CPU` ADD CONSTRAINT `Detail_CPU_id_socket_fkey` FOREIGN KEY (`id_socket`) REFERENCES `Socket`(`id_socket`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Motherboard` ADD CONSTRAINT `Detail_Motherboard_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Motherboard` ADD CONSTRAINT `Detail_Motherboard_id_socket_fkey` FOREIGN KEY (`id_socket`) REFERENCES `Socket`(`id_socket`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Motherboard` ADD CONSTRAINT `Detail_Motherboard_id_tipe_ram_fkey` FOREIGN KEY (`id_tipe_ram`) REFERENCES `Tipe_RAM`(`id_tipe_ram`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Simulasi` ADD CONSTRAINT `Simulasi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Simulasi` ADD CONSTRAINT `Detail_Simulasi_id_simulasi_fkey` FOREIGN KEY (`id_simulasi`) REFERENCES `Simulasi`(`id_simulasi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Simulasi` ADD CONSTRAINT `Detail_Simulasi_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Keranjang` ADD CONSTRAINT `Keranjang_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Keranjang` ADD CONSTRAINT `Keranjang_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Transaksi` ADD CONSTRAINT `Detail_Transaksi_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id_produk`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Transaksi` ADD CONSTRAINT `Detail_Transaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
