-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 01:52 PM
-- Server version: 11.4.2-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mjtek-site-rev`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `brand_name` varchar(191) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`brand_name`, `id`) VALUES
('AMD', 2),
('AOC', 13),
('Asus', 4),
('Colorful', 6),
('Durandal', 12),
('G.Skill', 7),
('Gigabyte', 3),
('Intel', 1),
('NZXT', 11),
('TeamGroup', 9),
('Viewsonic', 8),
('Western Digital', 10),
('Zotac', 5);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `date` datetime(3) NOT NULL,
  `is_selected` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`) VALUES
(8, 'Casing'),
(1, 'CPU'),
(7, 'HDD'),
(5, 'Monitor'),
(4, 'Motherboard'),
(10, 'PC Ready'),
(9, 'PSU'),
(2, 'RAM'),
(6, 'SSD'),
(3, 'VGA');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `file_type` varchar(191) NOT NULL,
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `source` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`file_type`, `id`, `product_id`, `source`) VALUES
('image', 1, 4, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/101b7487-a1fc-4280-aedc-5567d871b698.jpg'),
('image', 2, 4, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/d88f0673-d4b8-4731-a2c6-5ab0230a01db.jpg'),
('image', 9, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/2/22/0a887c07-9adc-43c2-a40b-832970903953.png'),
('image', 10, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/4/29/d1769bee-7251-4280-988d-84051f699d68.jpg'),
('image', 18, 8, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/25/2d601894-9468-4c63-ad0c-75a52034e166.jpg'),
('image', 19, 8, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/25/3efff27c-8a23-4ccb-bf2f-e55a7f48e24b.jpg'),
('image', 20, 3, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/23/296f417a-dfa3-4a71-975d-d1b707fc7707.png'),
('image', 21, 2, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/16/fbb341ce-1f46-4d5f-928f-0437e9281990.png'),
('image', 22, 1, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/6/6/4fe9dcad-6eaf-47e5-ba3c-23e3d161f486.png'),
('image', 101, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/22/2f4f22c9-72df-4c32-a008-7aa8ddf55da4.jpg'),
('image', 102, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/22/74e6f5cb-0e9e-4360-ae35-2a9ca7a277b4.jpg'),
('image', 103, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/2/4/fb2e43a4-95e7-4db5-be81-ff0c6430adcd.jpg'),
('image', 104, 9, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/27/2a922d58-3514-46f6-b4f8-9c29dc0d1aef.png'),
('image', 105, 10, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/9/17/180ceb5c-558d-415c-9953-3b488e8b145a.jpg'),
('image', 106, 10, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/9/8/07ff7a11-79f6-4e09-ab74-a45e20e198ed.jpg'),
('image', 107, 11, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/8/2/300d215f-c3d6-40e5-b80a-f839ff43f1f8.png'),
('image', 108, 12, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/26/b925288e-1955-4798-95f7-11442553a1ab.png'),
('image', 109, 13, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/8/28/85892339-ef24-4eae-b14e-098f7f29d794.png');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) NOT NULL,
  `product_name` varchar(191) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `estimated_weight` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `sub_category_id`, `brand_id`, `product_name`, `price`, `description`, `estimated_weight`, `stock`, `is_deleted`) VALUES
(1, 1, 1, 1, 'Intel Core I7-12700F 12th Gen Processor', 4175000.00, 'GARANSI RESMI !!\n\nIntel Core I7-12700F 12th Gen.Processor\n\n*Discrete Graphics Required*\n\nCPU Specifications\n- Total Cores : 12\n- # of Performance-cores : 8\n- # of Efficient-cores : 4\n- Total Threads : 20\n- Max Turbo Frequency : 4.90 GHz\n- Intel® Turbo Boost Max Technology 3.0 Frequency : 4.90 GHz\n- Performance-core Max Turbo Frequency : 4.80 GHz\n- Efficient-core Max Turbo Frequency : 3.60 GHz\n- Performance-core Base Frequency : 2.10 GHz\n- Efficient-core Base Frequency : 1.60 GHz\n- Cache : 25 MB Intel® Smart Cache\n- Total L2 Cache : 12 MB\n- Processor Base Power : 65 W\n- Maximum Turbo Power : 180 W\n- Max Memory Size (dependent on memory type) : 128 GB\n- Sockets Supported : FCLGA1700\n\nRp 4.xxx.xxx\n\nTERMS:\n*apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n*garansi masing-masing part berbeda-beda.\n*belum termasuk ongkos kirim.\n*harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n*harga di tokopedia dan offline berbeda\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 4.00, 9, 0),
(2, 1, 1, 1, 'Intel Core I5 12400F 12th Gen Processor', 2250000.00, 'GARANSI RESMI !!!\n\nPROCESSOR INTEL CORE I5 12400F\n\nSpesifikasi:\nTotal Cores 6\n# of Performance-cores 6\n# of Efficient-cores 0\nTotal Threads 12\nMax Turbo Frequency 4.40 GHz\nPerformance-core Max Turbo Frequency 4.40 GHz\nPerformance-core Base Frequency 2.50 GHz\nCache 18 MB Intel® Smart Cache\nTotal L2 Cache 7.5 MB\nProcessor Base Power 65 W\nMaximum Turbo Power 117 W\nSockets Supported FCLGA1700\nMax CPU Configuration 1\nThermal Solution Specification PCG 2020C\nTJUNCTION 100°C\nPackage Size 45.0 mm x 37.5 mm\n\nRp 2.xxx.xxx\n\nTERMS:\n*apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n*garansi masing-masing part berbeda-beda.\n*belum termasuk ongkos kirim.\n*harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n*harga di tokopedia dan offline berbeda\n\nBaru Garansi Resmi\n\n*Harga dapat berubah sewaktu2\n*Spesifikasi tidak mengikat tergantung persediaan barang\n*Spesifikasi masih bisa di sesuaikan kembali tergantung budget dan kebtuhan\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 4.00, 9, 0),
(3, 4, NULL, 3, 'Gigabyte H610M K DDR4 Motherboard Intel LGA 1700', 1225000.00, 'GARANSI RESMI !!\n\nGigabyte H610M K DDR4 Motherboard Intel LGA 1700\n\nSpecifications\nLGA1700 socket: Support for 13th Generation Intel® Core™ Processors and 12th Generation Intel® Core™, Pentium® Gold and Celeron® Processors*\nL3 cache varies with CPU\nChipset\nIntel® H610 Express Chipset\nSupport for DDR4\n2 x DDR4 DIMM sockets supporting up to 64 GB\nDual channel memory architecture\n\nRp 1.xxx.xxx\n\nTERMS:\n*apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n*garansi masing-masing part berbeda-beda.\n*belum termasuk ongkos kirim.\n*harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n*harga di tokopedia dan offline berbeda\n\nBaru Garansi Resmi\n\n*Harga dapat berubah sewaktu2\n*Spesifikasi tidak mengikat tergantung persediaan barang\n*Spesifikasi masih bisa di sesuaikan kembali tergantung budget dan kebtuhan\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 1.20, 5, 0),
(4, 3, 3, 3, 'VGA Card Gigabyte GeForce RTX 3060 WINDFORCE OC 12G - 12GB GDDR6', 5150000.02, 'GARANSI RESMI !!!\n\nThe Ultimate Play Seri GeForce RTX® 30 dengan teknologi Ray Tracing, NVIDIA DLSS dan NVIDIA® Reflex\n\nSpesifikasi :\nGraphics Processing : GeForce RTX™ 3060\nCore Clock : 1792 MHz (Reference Card: 1777 MHz)\nCUDA® Cores : 3584\nMemory Clock : 15000 MHz\nMemory Size : 12 GB\nMemory Type : GDDR6\nMemory Bus : 192 bit\nMemory Bandwidth (GB/sec) : 360 GB/s\nCard Bus : PCI-E 4.0 x 16\nDigital max resolution : 7680x4320\nMulti-view : 4\nCard size : L=198 W=121 H=39 mm\nPCB Form : ATX\nDirectX : 12 Ultimate\nOpenGL : 4.6\nRecommended PSU : 550W\nPower Connectors : 8 pin*1\nOutput : DisplayPort 1.4a *2, HDMI 2.1 *2\nSLI Support : N/A\nAccessories : Quick guide\n\nMore info www.gigabyte.com/Graphics-Card/NVIDIA-Series\n\nGaransi Distributor Resmi Gigabyte 3 tahun: Service & parts.\n\nDi dalam kotak:\nVGA Card, Quick Guide (Tidak dilengkapi CD driver, mohon download driver terbaru pada website NVIDIA® GeForce®.)\nhttps://www.nvidia.com/en-us/geforce/drivers/\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 3.00, 11, 0),
(7, 2, NULL, 7, 'RAM G.Skill Trident Z 16GB DDR4 Kit 3600MHz RGB Effects', 970000.00, 'GARANSI RESMI !!!\n\nG.Skill Trident Z 16GB DDR4 Kit 3600MHz RGB\n\nSpesifikasi:\nSeries Trident Z RGB\nMemory Type DDR4\nCapacity 16GB (8GBx2)\nMulti-Channel Kit Dual Channel Kit\nTested Speed 3600MHz\nTested Latency 19-20-20-40\nTested Voltage 1.35v\nRegistered/Unbuffered Unbuffered\nError Checking Non-ECC\nSPD Speed 2133MHz\nSPD Voltage 1.20v\nFan lncluded No\nHeight 44 mm / 1.73 inch\n\nRp 9xx.xxx\n\nTERMS:\n*apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n*garansi masing-masing part berbeda-beda.\n*belum termasuk ongkos kirim.\n*harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n*harga di tokopedia dan offline berbeda\n\nBaru Garansi Resmi\n\n*Harga dapat berubah sewaktu2\n*Spesifikasi tidak mengikat tergantung persediaan barang\n*Spesifikasi masih bisa di sesuaikan kembali tergantung budget dan kebtuhan\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 0.70, 10, 0),
(8, 5, NULL, 8, 'Monitor LED Viewsonic VX2780-2K 27 IPS QHD 1440p 170Hz HDR10 - VX2758A-2K-PRO2', 3300000.00, 'GARANSI RESMI !!!\n\nViewSonic VX2758A-2K-PRO-2\n\n27” 2K 170Hz Gaming Monitor\n\n\nWarranty : 3 Years\n\n- 2K QHD resolution ensures crystal-clear details​\n- SuperClear® IPS panel ensures wide viewing angles and vibrant colors for immersive gaming\n- A 170Hz refresh rate delivers fluid visuals for smoother gameplay​\n- Swift 1ms MPRT ensures razor-sharp visuals in fast-paced gaming​\n- Variable refresh rate eliminates screen tearing and reduces screen stuttering​\n- Enjoy hassle-free connectivity through HDMI and DisplayPort inputs\n\nSpec :\nDisplay Size (in.): 27\nViewable Area (in.): 27\nPanel Type: IPS Technology\nResolution: 2560 x 1440\nResolution Type: QHD (Quad HD)\nStatic Contrast Ratio: 1,000:1 (typ)\nDynamic Contrast Ratio: 80M:1\nLight Source: LED\nBrightness: 300 cd/m² (typ)\nColors: 1.07B\nColor Space Support: 10 bit (8 bit + FRC)\nAspect Ratio: 16:9\nResponse Time (MPRT): 1ms\nViewing Angles: 178º horizontal, 178º vertical\nBacklight Life (Hours): 30000 Hrs (Min)\nCurvature: Flat\nRefresh Rate (Hz): 170\n\nConnector :\n3.5mm Audio Out: 1\nHDMI 2.0 (with HDCP 2.2): 2\nDisplayPort: 1\nPower in: 3-pin Socket (IEC C14 / CEE22)\n\nAudio port : 1 x 3.5mm Audio Out\nVESA mounting (mm) : 100x100\nErgonomic Stand : Yes (HAS, Swivel, Tilt, Pivot)\n\nPower Cons (watt) : 39\nProduct Weight (nw/kg) : 6.3\nBox Dimension (cm) : 86 x 49 x 13\nVolume Weight (kg) : 10\n\nInclude :\nPower Cable\nDP Cable\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 3.00, 5, 0),
(9, 6, NULL, 9, 'SSD NVME TEAMGROUP MP33 512GB', 600000.00, 'GARANSI RESMI !!\\n\\nSSD NVME TEAMGROUP MP33 512GB\\n\\nSpesifikasi :\\nInterface: PCIe 3.0 x4 with NVMe 1.3\\nCapacity: 512GB\\nColor: Blue / Black\\nVoltage: DC +3.3V\\nOperation Temperature: 0˚C ~ 70˚C\\nStorage Temperature: -40˚C ~ 85˚C\\nTerabyte Written: 512GB / >350TB\\nPerformance: Crystal Disk Mark Read/Write: up to 1,700/1,400 MB/s\\nIOPS: Read/Write: 220K/200K IOPS Max\\nWeight: 6g\\nDimensions: 80(L) x 22(W) x 3.8(H) mm\\nHumidity: RH 90% under 40°C (operational)\\nVibration: 80Hz~2,000Hz/20G\\nShock: 1,500G/0.5ms\\nMTBF: 1,500,000 hours\\n\\nRp 6xx.xxx\\n\\nTERMS:\\n*apabila ada part yang kosong, maka akan digantikan dengan part yang setara\\n*garansi masing-masing part berbeda-beda.\\n*belum termasuk ongkos kirim.\\n*harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\\n*harga di tokopedia dan offline berbeda\\n\\nBaru Garansi Resmi\\n\\n*Harga dapat berubah sewaktu2\\n*Spesifikasi tidak mengikat tergantung persediaan barang\\n*Spesifikasi masih bisa di sesuaikan kembali tergantung budget dan kebtuhan\\n\\nLayanan MJ Teknologi Semarang\\n.Penjualan PC Komputer Rakitan\\n.Service PC & Laptop\\n.Upgrade PC & Laptop\\n.Tukar Tambah dari PC maupun Laptop\\n.Pengadaan sekolah lewat Siplah\\n.Bisa mengeluarkan faktur pajak\\n\\nMJ Teknologi Semarang\\nJl Sendang Utara III No 12a dekat SMA 2\\nMajapahit. Semarang\\n\\nTelp / WA : 08976607559\\nwa.me/628976607559\\n\\nGooglemap : MJ Teknologi Semarang\\nIG : mjteknologi_semarang\\nTokopedia : MJ Teknologi Semarang\\n\\nPusat PC Rakitan dan Hardware PC\\nGaming . Editing . Office. Rendering\\n\\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 0.30, 10, 0),
(10, 7, NULL, 10, 'Harddisk HDD PC WD BLUE 1TB RESMI ORIGINAL', 765000.00, 'Dibangun dengan standar tertinggi WD kualitas dan kehandalan, WD Blue menawarkan fitur dan kapasitas entry-level yang ideal untuk kebutuhan komputasi Anda. WD Blue dirancang oleh merek yang Anda percaya dengan kualitas yang Anda harapkan untuk, terbukti, solusi penyimpanan sehari-hari diuji.\n\nWD Biru penyimpanan dirancang dan diproduksi dengan teknologi yang ditemukan di asli pemenang penghargaan dekstop WD dan hard drive mobile. WD Biru menetapkan dasar untuk penyimpanan sehari-hari dengan konsisten memberikan peningkatan kinerja lebih dari generasi sebelumnya sementara berhasil menjaga kualitas WD dan kehandalan selama lebih dari enam generasi. Perbedaannya adalah bahwa warna kami tidak pernah pudar, dari generasi ke generasi.\n\nWD biru tersedia dalam berbagai kapasitas entry-level, ukuran cache, faktor bentuk dan interface sehingga Anda dapat yakin ada drive yang sempurna bagi sistem anda. Namun, tidak semua hard drive diciptakan sama dan untuk aplikasi Anda yang menuntut lebih, WD memberikan Anda kekuatan pilihan.', 0.60, 10, 0),
(11, 9, NULL, 11, 'Power Supply NZXT C750 Bronze - 750W 80 Plus', 1100000.00, 'Power Supply NZXT C750 Bronze - 750W 80 Plus\n\nSPESIFIKASI:\nTECH SPECS\nOUTPUT CONNECTOR(S)\n24-pin ATX Power:1\n4+4-pin CPU power:2\n6+2-pin PCIe power:2\nSATA Power:4\nPeripherals:4\n\nCABLE SPECS\n24-pin ATX power:600mm, Nylon sleeving\n4+4-pin CPU power:700mm, Nylon sleeving\n6+2-pin PCIe power:650 + 150mm, Nylon sleeving\nSATA power:500 + 150 mm\nPeripherals:500 + 150 mm\n\nAC INPUT RATING\n100 - 240Vac:10A-5A 50Hz-60Hz\n\nDC OUTPUT RATING\n+3.3V:20A (120W)\n+5V:20A (120W)\n+12V:62.5A (750W)\n-12V:0.3A (3.6W)\n5Vsb:2.5A (12.5W)\nTotal:750W\n\nRp 1.xxx.xxx\n\nTERMS:\n* apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n* garansi masing-masing part berbeda-beda.\n* belum termasuk ongkos kirim.\n* harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n* harga di tokopedia dan offline berbeda\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit. Semarang\n\nTelp / WA : 08976607559\nwa.me/628976607559\n\nGooglemap : MJ Teknologi Semarang\nIG : mjteknologi_semarang\nTokopedia : MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming . Editing . Office. Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 1.50, 14, 0),
(12, 8, NULL, 12, 'Paradox Gaming Case Durandal - Black', 565000.00, 'Paradox Gaming Case Durandal - Black\n\nSpesifikasi:\nDIMENSIONS: 325*200*380MM\nMATERIAL: SPCC 0.50mm, LEFT TEMPERED GLASS 5mm PANEL\nM/B TYPE: MICRO ATX, MINI ITX\nI/O: USB3.0 x 1 + USB2.0 x 2 + HD AUDIO\nEXPANSION SLOT: 7\nCORD DESIGN: BACKPLATE WIRE ROUTING\nCPU COOLER MAX: 150MM\nVGA MAX: 320MM\nPSU SUPPORT: ATX POWER SUPPLY\n\nDRIVE BAY\n3.5\': 2\n2.5\': 2\n5.25\': –\n\nFAN SLOTS\nTop: 2 x 120mm\nFront: PREINSTALLED 3 x 120mm RGB fan controlled by switch\nRear: 1 x 120mm\n\nRp 5xx.xxx\n\nTERMS:\n* apabila ada part yang kosong, maka akan digantikan dengan part yang setara\n* garansi masing-masing part berbeda-beda.\n* belum termasuk ongkos kirim.\n* harga dapat berubah sewaktu-waktu, harap konfirmasi terlebih dahulu sebelum order.\n* harga di tokopedia dan offline berbeda\n\nLayanan MJ Teknologi Semarang\n.Penjualan PC Komputer Rakitan\n.Service PC & Laptop\n.Upgrade PC & Laptop\n.Tukar Tambah dari PC maupun Laptop\n.Pengadaan sekolah lewat Siplah\n.Bisa mengeluarkan faktur pajak\n\nMJ Teknologi Semarang\nJl Sendang Utara III No 12a dekat SMA 2\nMajapahit, Semarang\n\nTelp / WA: 08976607559\nwa.me/628976607559\n\nGoogle Map: MJ Teknologi Semarang\nIG: mjteknologi_semarang\nTokopedia: MJ Teknologi Semarang\n\nPusat PC Rakitan dan Hardware PC\nGaming, Editing, Office, Rendering\n\n#TokoKomputerRakitanSemarang #KomputerRakitanSemarang #PCRakitanSemarang #CustomPCSemarang #GamingPCSemarang #PCGamingSemarang #TokoKomputerCustomSemarang #KomputerGamingRakitanSemarang #TokoPCRakitanSemarang #KomputerCustomSemarang', 3.00, 4, 0),
(13, 5, NULL, 13, 'MONITOR AOC C24G2 165Hz 24 Inch', 3000000.00, 'AOC 24G2 24\" LED IPS 1ms 144hz 1080P Gaming Monitor\n\nGaransi Resmi 3 Tahun\n\nSpecifications and possibilities\n\nMonitor colour: Black Red\nScreen size (inch): 23.8 inch\nResolution: 1920x1080\nRefresh rate: 144Hz\nResponse Time (MPRT): 1 ms\nPanel Type: IPS\nSync Range: 48-144\nSync Technology: FreeSync Premium\nBacklight: WLED\nFlicker-free: Yes\nAspect ratio: 16:9\nBrightness (typical): 250\nContrast (dynamic): 20M:1\nPixel Pitch: 0.2745\nActive Screen Area (WxH) (mm): 527.04 X 296.46 mm\nViewing angle (CR10): 178/178 º\nDisplay Colours: 16.7 Million\nBezel Type: Frameless\nScanning Frequency: VGA/DP1.2/HDMI1.4 : 30 -160KHz (H) VGA : 50 -146 Hz (V) DP1.2/HDMI1.4 :48-146Hz (V)\nOSD languages: EN, FR, ES, PT, DE, IT, NL, SE, FI, PL, CZ, RU, KR, CN (T), CN (S), JP\nSignal Input: HDMI 1.4 x 2, DisplayPort 1.2 x 1, VGA\nAudio output: Headphone out (3.5mm)\nFlat / Curved: Flat\nFrameless Design: Yes\nRemovable Stand: Yes\nPowersupply: Internal\nPowersource: 100 - 240V 50/60Hz\nPowerConsumption On (Energystar): 21W watt\nPowerConsumption Standby (Energystar): 0.5W watt\nProduct Dimensions (incl base) (mm): 21.22x19.87x8.95 in mm\nCarton Dimensions: 23.81x19.37x7.24 in mm\nNet Weight (excl package) (kg): 9.37 Kg\nGross Weight (incl package) (kg): 13.67 Kg\nWarranty Period: 3 Years', 3.00, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_ram_type`
--

CREATE TABLE `product_ram_type` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ram_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_ram_type`
--

INSERT INTO `product_ram_type` (`id`, `product_id`, `ram_type_id`) VALUES
(3, 7, 1),
(4, 3, 2),
(5, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_socket`
--

CREATE TABLE `product_socket` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `socket_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_socket`
--

INSERT INTO `product_socket` (`id`, `product_id`, `socket_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ram_type`
--

CREATE TABLE `ram_type` (
  `id` int(11) NOT NULL,
  `ram_type_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ram_type`
--

INSERT INTO `ram_type` (`id`, `ram_type_name`) VALUES
(4, 'DDR2'),
(3, 'DDR3'),
(1, 'DDR4'),
(2, 'DDR5');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `simulation`
--

CREATE TABLE `simulation` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `simulation_detail`
--

CREATE TABLE `simulation_detail` (
  `id` int(11) NOT NULL,
  `simulation_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socket`
--

CREATE TABLE `socket` (
  `id` int(11) NOT NULL,
  `socket_name` varchar(191) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `release_date` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `socket`
--

INSERT INTO `socket` (`id`, `socket_name`, `brand_id`, `description`, `release_date`) VALUES
(1, 'LGA1700', 1, 'Supports Intel 12th and 13th Gen Core processors.', '2021-03-01 00:00:00.000'),
(2, 'LGA1200', 1, 'Supports Intel 10th and 11th Gen Core processors.', '2020-05-01 00:00:00.000'),
(3, 'LGA1151', 1, 'Supports Intel 6th to 9th Gen Core processors.', '2015-08-01 00:00:00.000'),
(4, 'AM5', 2, 'Supports AMD Ryzen 7000 Series processors.', '2022-09-01 00:00:00.000'),
(5, 'AM4', 2, 'Supports AMD Ryzen 1000 to 5000 Series processors.', '2017-03-01 00:00:00.000'),
(6, 'TR4', 2, 'Supports AMD Ryzen Threadripper 1000 and 2000 Series.', '2017-08-01 00:00:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` int(11) NOT NULL,
  `sub_category_name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `sub_category_name`) VALUES
(2, 'AMD'),
(1, 'Intel'),
(3, 'NVIDIA');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `total_items` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `description` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_log`
--

CREATE TABLE `transaction_log` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `order_status` int(11) NOT NULL,
  `timestamp` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `id` varchar(191) NOT NULL,
  `phone_number` varchar(191) NOT NULL,
  `role_id` int(11) NOT NULL
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
('4312f38d-07ee-4270-a56a-3e5427b10c6e', '310830896a908965569d8bba3a967c7a8863758c4a7a6dc8e1d8e948d0a88d23', '2024-10-16 04:32:32.304', '20240704093855_normalization_for_detail_produk', NULL, NULL, '2024-10-16 04:32:32.196', 1),
('48e56b09-0483-4917-a2b8-7bed998de7a9', '37c5b375fdc740e3992980b78a6b75cf8f80aa871321ac46c19b00d5d438aaeb', '2024-10-16 04:32:37.942', '20241016043237_fixed_be', NULL, NULL, '2024-10-16 04:32:37.409', 1),
('8687c7c0-56d6-4693-985b-3dc1450e070b', '768f51910e7ea9768766e0c98186439b1cecb616d3e111341e1c46b6fb65d138', '2024-10-16 04:32:32.478', '20240705064919_added_is_selected_to_keranjang', NULL, NULL, '2024-10-16 04:32:32.471', 1),
('aa562c00-d751-42fb-82eb-d660b6a48580', '68494473ad5036f6bf4a057f1b109c7732382c4b4ffb98bcf8bdf74590a1e2cf', '2024-11-08 10:56:08.910', '20241108105608_fix_socket', NULL, NULL, '2024-11-08 10:56:08.884', 1),
('bdc16ed1-c058-4eae-b02b-5a9c816704c2', 'c383a5e7dbe2fe77a42ca067595b301f5b92353913674a5564a30b1bcc9c47cd', '2024-10-16 04:32:32.461', '20240705040231_changed_user_id_to_use_uuid', NULL, NULL, '2024-10-16 04:32:32.304', 1),
('cde3d334-0056-4a6b-81be-7b5a1d585d46', '8e96f02612a039cd880e08c54c3683172da14f98ac0a6cbb7b03e6cfe98197bd', '2024-10-16 04:32:32.470', '20240705061728_added_jumlah_produk_into_keranjang', NULL, NULL, '2024-10-16 04:32:32.462', 1),
('f441c0c4-ad0b-4e11-a79c-6811a2e864f4', '20457a9c364e6c9ef83911f9f70b9e6f66dfbecd961714117ce59e3ba269aebe', '2024-10-16 04:32:32.195', '20240701083453_init', NULL, NULL, '2024-10-16 04:32:31.840', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brand_brand_name_key` (`brand_name`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_product_id_idx` (`product_id`),
  ADD KEY `cart_user_id_idx` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_category_name_key` (`category_name`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorite_product_id_fkey` (`product_id`),
  ADD KEY `favorite_user_id_fkey` (`user_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_product_id_fkey` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_category_id_idx` (`category_id`),
  ADD KEY `product_sub_category_id_idx` (`sub_category_id`),
  ADD KEY `product_brand_id_idx` (`brand_id`);

--
-- Indexes for table `product_ram_type`
--
ALTER TABLE `product_ram_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_ram_type_product_id_fkey` (`product_id`),
  ADD KEY `product_ram_type_ram_type_id_fkey` (`ram_type_id`);

--
-- Indexes for table `product_socket`
--
ALTER TABLE `product_socket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_socket_product_id_fkey` (`product_id`),
  ADD KEY `product_socket_socket_id_fkey` (`socket_id`);

--
-- Indexes for table `ram_type`
--
ALTER TABLE `ram_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ram_type_ram_type_name_key` (`ram_type_name`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `simulation`
--
ALTER TABLE `simulation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `simulation_user_id_idx` (`user_id`);

--
-- Indexes for table `simulation_detail`
--
ALTER TABLE `simulation_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `simulation_detail_simulation_id_product_id_idx` (`simulation_id`,`product_id`),
  ADD KEY `simulation_detail_product_id_fkey` (`product_id`);

--
-- Indexes for table `socket`
--
ALTER TABLE `socket`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `socket_socket_name_key` (`socket_name`),
  ADD KEY `socket_brand_id_idx` (`brand_id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sub_category_sub_category_name_key` (`sub_category_name`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_user_id_idx` (`user_id`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_detail_product_id_transaction_id_idx` (`product_id`,`transaction_id`),
  ADD KEY `transaction_detail_transaction_id_fkey` (`transaction_id`);

--
-- Indexes for table `transaction_log`
--
ALTER TABLE `transaction_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_log_transaction_id_fkey` (`transaction_id`),
  ADD KEY `transaction_log_user_id_fkey` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD UNIQUE KEY `unique_email_constraint` (`email`),
  ADD KEY `user_role_id_fkey` (`role_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_ram_type`
--
ALTER TABLE `product_ram_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_socket`
--
ALTER TABLE `product_socket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ram_type`
--
ALTER TABLE `ram_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `simulation`
--
ALTER TABLE `simulation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `simulation_detail`
--
ALTER TABLE `simulation_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `socket`
--
ALTER TABLE `socket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_log`
--
ALTER TABLE `transaction_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sub_category_id_fkey` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_ram_type`
--
ALTER TABLE `product_ram_type`
  ADD CONSTRAINT `product_ram_type_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ram_type_ram_type_id_fkey` FOREIGN KEY (`ram_type_id`) REFERENCES `ram_type` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_socket`
--
ALTER TABLE `product_socket`
  ADD CONSTRAINT `product_socket_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `product_socket_socket_id_fkey` FOREIGN KEY (`socket_id`) REFERENCES `socket` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `simulation`
--
ALTER TABLE `simulation`
  ADD CONSTRAINT `simulation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `simulation_detail`
--
ALTER TABLE `simulation_detail`
  ADD CONSTRAINT `simulation_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `simulation_detail_simulation_id_fkey` FOREIGN KEY (`simulation_id`) REFERENCES `simulation` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `socket`
--
ALTER TABLE `socket`
  ADD CONSTRAINT `socket_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `transaction_detail_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transaction_log`
--
ALTER TABLE `transaction_log`
  ADD CONSTRAINT `transaction_log_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
