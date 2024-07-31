-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2024 at 09:13 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mj_tek_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id_brand` int(11) NOT NULL,
  `nama_brand` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_simulasi`
--

CREATE TABLE `detail_simulasi` (
  `id_detail_simulasi` int(11) NOT NULL,
  `id_simulasi` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `jumlah_produk` int(11) NOT NULL,
  `jumlah_harga` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorit`
--

CREATE TABLE `favorit` (
  `id_favorit` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id_keranjang` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `tanggal` datetime(3) NOT NULL,
  `jumlah_produk` int(11) NOT NULL DEFAULT 1,
  `isSelected` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_transaksi`
--

CREATE TABLE `log_transaksi` (
  `id_log_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `status_pesanan` int(11) NOT NULL,
  `waktu` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id_media` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `sumber` varchar(191) NOT NULL,
  `tipe_file` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `id_sub_kategori` int(11) DEFAULT NULL,
  `id_brand` int(11) NOT NULL,
  `nama_produk` varchar(191) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `est_berat` decimal(10,2) NOT NULL,
  `stok` int(11) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_socket`
--

CREATE TABLE `produk_socket` (
  `id_produk_socket` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_socket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_tipe_ram`
--

CREATE TABLE `produk_tipe_ram` (
  `id_produk_ram` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `id_tipe_ram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `deskrips` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `simulasi`
--

CREATE TABLE `simulasi` (
  `id_simulasi` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `judul` varchar(191) NOT NULL,
  `deskripsi` varchar(191) NOT NULL,
  `tanggal` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socket`
--

CREATE TABLE `socket` (
  `id_socket` int(11) NOT NULL,
  `nama_socket` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subkategori`
--

CREATE TABLE `subkategori` (
  `id_sub_kategori` int(11) NOT NULL,
  `nama_sub_kategori` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tipe_ram`
--

CREATE TABLE `tipe_ram` (
  `id_tipe_ram` int(11) NOT NULL,
  `tipe_ram` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_user` varchar(191) NOT NULL,
  `total_barang` int(11) NOT NULL,
  `harga_total` decimal(10,2) NOT NULL,
  `deskripsi` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(191) NOT NULL,
  `id_role` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `alamat` varchar(191) NOT NULL,
  `no_hp` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('27952a0b-67b4-40f8-b49e-ffb4cd6ce43a', '768f51910e7ea9768766e0c98186439b1cecb616d3e111341e1c46b6fb65d138', '2024-07-29 03:20:44.205', '20240705064919_added_is_selected_to_keranjang', NULL, NULL, '2024-07-29 03:20:44.198', 1),
('30853022-9bda-4add-96d3-48e77fb6bfa7', '78c9322349cb1264a3bcbaa4069afeab2859acd34ed0c36f690ba75b94d408f9', '2024-07-29 03:20:43.611', '20240701083453_init', NULL, NULL, '2024-07-29 03:20:42.491', 1),
('4cc78ce8-49df-4204-aa58-07cc3662ae8c', '8e96f02612a039cd880e08c54c3683172da14f98ac0a6cbb7b03e6cfe98197bd', '2024-07-29 03:20:44.197', '20240705061728_added_jumlah_produk_into_keranjang', NULL, NULL, '2024-07-29 03:20:44.189', 1),
('61ed2309-0911-4bae-8e5f-abf05605bb38', 'c383a5e7dbe2fe77a42ca067595b301f5b92353913674a5564a30b1bcc9c47cd', '2024-07-29 03:20:44.188', '20240705040231_changed_user_id_to_use_uuid', NULL, NULL, '2024-07-29 03:20:43.798', 1),
('e82bfe21-5593-440f-a9f3-87c2d074ed76', '310830896a908965569d8bba3a967c7a8863758c4a7a6dc8e1d8e948d0a88d23', '2024-07-29 03:20:43.797', '20240704093855_normalization_for_detail_produk', NULL, NULL, '2024-07-29 03:20:43.612', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`),
  ADD UNIQUE KEY `Brand_nama_brand_key` (`nama_brand`);

--
-- Indexes for table `detail_simulasi`
--
ALTER TABLE `detail_simulasi`
  ADD PRIMARY KEY (`id_detail_simulasi`),
  ADD KEY `Detail_Simulasi_id_simulasi_id_produk_idx` (`id_simulasi`,`id_produk`),
  ADD KEY `Detail_Simulasi_id_produk_fkey` (`id_produk`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `Detail_Transaksi_id_produk_id_transaksi_idx` (`id_produk`,`id_transaksi`),
  ADD KEY `Detail_Transaksi_id_transaksi_fkey` (`id_transaksi`);

--
-- Indexes for table `favorit`
--
ALTER TABLE `favorit`
  ADD PRIMARY KEY (`id_favorit`),
  ADD KEY `Favorit_id_produk_fkey` (`id_produk`),
  ADD KEY `Favorit_id_user_fkey` (`id_user`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`),
  ADD UNIQUE KEY `Kategori_nama_kategori_key` (`nama_kategori`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id_keranjang`),
  ADD KEY `Keranjang_id_produk_idx` (`id_produk`),
  ADD KEY `Keranjang_id_user_idx` (`id_user`);

--
-- Indexes for table `log_transaksi`
--
ALTER TABLE `log_transaksi`
  ADD PRIMARY KEY (`id_log_transaksi`),
  ADD KEY `Log_Transaksi_id_transaksi_fkey` (`id_transaksi`),
  ADD KEY `Log_Transaksi_id_user_fkey` (`id_user`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id_media`),
  ADD KEY `Media_id_produk_fkey` (`id_produk`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD KEY `Produk_id_kategori_idx` (`id_kategori`),
  ADD KEY `Produk_id_sub_kategori_idx` (`id_sub_kategori`),
  ADD KEY `Produk_id_brand_idx` (`id_brand`);

--
-- Indexes for table `produk_socket`
--
ALTER TABLE `produk_socket`
  ADD PRIMARY KEY (`id_produk_socket`),
  ADD KEY `Produk_Socket_id_produk_fkey` (`id_produk`),
  ADD KEY `Produk_Socket_id_socket_fkey` (`id_socket`);

--
-- Indexes for table `produk_tipe_ram`
--
ALTER TABLE `produk_tipe_ram`
  ADD PRIMARY KEY (`id_produk_ram`),
  ADD KEY `Produk_Tipe_RAM_id_produk_fkey` (`id_produk`),
  ADD KEY `Produk_Tipe_RAM_id_tipe_ram_fkey` (`id_tipe_ram`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `simulasi`
--
ALTER TABLE `simulasi`
  ADD PRIMARY KEY (`id_simulasi`),
  ADD KEY `Simulasi_id_user_idx` (`id_user`);

--
-- Indexes for table `socket`
--
ALTER TABLE `socket`
  ADD PRIMARY KEY (`id_socket`),
  ADD UNIQUE KEY `Socket_nama_socket_key` (`nama_socket`);

--
-- Indexes for table `subkategori`
--
ALTER TABLE `subkategori`
  ADD PRIMARY KEY (`id_sub_kategori`),
  ADD UNIQUE KEY `SubKategori_nama_sub_kategori_key` (`nama_sub_kategori`);

--
-- Indexes for table `tipe_ram`
--
ALTER TABLE `tipe_ram`
  ADD PRIMARY KEY (`id_tipe_ram`),
  ADD UNIQUE KEY `Tipe_RAM_tipe_ram_key` (`tipe_ram`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `Transaksi_id_user_idx` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_email_constraint` (`email`),
  ADD KEY `User_id_role_fkey` (`id_role`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_simulasi`
--
ALTER TABLE `detail_simulasi`
  MODIFY `id_detail_simulasi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorit`
--
ALTER TABLE `favorit`
  MODIFY `id_favorit` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id_keranjang` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_transaksi`
--
ALTER TABLE `log_transaksi`
  MODIFY `id_log_transaksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id_media` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_socket`
--
ALTER TABLE `produk_socket`
  MODIFY `id_produk_socket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_tipe_ram`
--
ALTER TABLE `produk_tipe_ram`
  MODIFY `id_produk_ram` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `simulasi`
--
ALTER TABLE `simulasi`
  MODIFY `id_simulasi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `socket`
--
ALTER TABLE `socket`
  MODIFY `id_socket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subkategori`
--
ALTER TABLE `subkategori`
  MODIFY `id_sub_kategori` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipe_ram`
--
ALTER TABLE `tipe_ram`
  MODIFY `id_tipe_ram` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_simulasi`
--
ALTER TABLE `detail_simulasi`
  ADD CONSTRAINT `Detail_Simulasi_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Detail_Simulasi_id_simulasi_fkey` FOREIGN KEY (`id_simulasi`) REFERENCES `simulasi` (`id_simulasi`) ON UPDATE CASCADE;

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `Detail_Transaksi_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Detail_Transaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON UPDATE CASCADE;

--
-- Constraints for table `favorit`
--
ALTER TABLE `favorit`
  ADD CONSTRAINT `Favorit_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorit_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `Keranjang_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Keranjang_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `log_transaksi`
--
ALTER TABLE `log_transaksi`
  ADD CONSTRAINT `Log_Transaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Log_Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `Media_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE;

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `Produk_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Produk_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Produk_id_sub_kategori_fkey` FOREIGN KEY (`id_sub_kategori`) REFERENCES `subkategori` (`id_sub_kategori`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `produk_socket`
--
ALTER TABLE `produk_socket`
  ADD CONSTRAINT `Produk_Socket_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Produk_Socket_id_socket_fkey` FOREIGN KEY (`id_socket`) REFERENCES `socket` (`id_socket`) ON UPDATE CASCADE;

--
-- Constraints for table `produk_tipe_ram`
--
ALTER TABLE `produk_tipe_ram`
  ADD CONSTRAINT `Produk_Tipe_RAM_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Produk_Tipe_RAM_id_tipe_ram_fkey` FOREIGN KEY (`id_tipe_ram`) REFERENCES `tipe_ram` (`id_tipe_ram`) ON UPDATE CASCADE;

--
-- Constraints for table `simulasi`
--
ALTER TABLE `simulasi`
  ADD CONSTRAINT `Simulasi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
