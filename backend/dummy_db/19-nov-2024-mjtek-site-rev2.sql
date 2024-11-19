-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2024 at 04:15 AM
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
-- Database: `mjtek-site-rev2`
--

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `brand_name`) VALUES
(2, 'AMD'),
(13, 'AOC'),
(4, 'Asus'),
(6, 'Colorful'),
(12, 'Durandal'),
(7, 'G.Skill'),
(3, 'Gigabyte'),
(1, 'Intel'),
(11, 'NZXT'),
(9, 'TeamGroup'),
(8, 'Viewsonic'),
(10, 'Western Digital'),
(5, 'Zotac');

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

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `product_id`, `source`, `file_type`) VALUES
(1, 4, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/101b7487-a1fc-4280-aedc-5567d871b698.jpg', 'image'),
(2, 4, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/11/d88f0673-d4b8-4731-a2c6-5ab0230a01db.jpg', 'image'),
(9, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/2/22/0a887c07-9adc-43c2-a40b-832970903953.png', 'image'),
(10, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2023/4/29/d1769bee-7251-4280-988d-84051f699d68.jpg', 'image'),
(18, 8, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/25/2d601894-9468-4c63-ad0c-75a52034e166.jpg', 'image'),
(19, 8, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/25/3efff27c-8a23-4ccb-bf2f-e55a7f48e24b.jpg', 'image'),
(20, 3, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/23/296f417a-dfa3-4a71-975d-d1b707fc7707.png', 'image'),
(21, 2, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/16/fbb341ce-1f46-4d5f-928f-0437e9281990.png', 'image'),
(22, 1, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/6/6/4fe9dcad-6eaf-47e5-ba3c-23e3d161f486.png', 'image'),
(101, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/22/2f4f22c9-72df-4c32-a008-7aa8ddf55da4.jpg', 'image'),
(102, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/1/22/74e6f5cb-0e9e-4360-ae35-2a9ca7a277b4.jpg', 'image'),
(103, 7, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/2/4/fb2e43a4-95e7-4db5-be81-ff0c6430adcd.jpg', 'image'),
(104, 9, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/4/27/2a922d58-3514-46f6-b4f8-9c29dc0d1aef.png', 'image'),
(105, 10, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/9/17/180ceb5c-558d-415c-9953-3b488e8b145a.jpg', 'image'),
(106, 10, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2021/9/8/07ff7a11-79f6-4e09-ab74-a45e20e198ed.jpg', 'image'),
(107, 11, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/8/2/300d215f-c3d6-40e5-b80a-f839ff43f1f8.png', 'image'),
(108, 12, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/5/26/b925288e-1955-4798-95f7-11442553a1ab.png', 'image'),
(109, 13, 'https://images.tokopedia.net/img/cache/900/VqbcmM/2024/8/28/85892339-ef24-4eae-b14e-098f7f29d794.png', 'image');

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

--
-- Dumping data for table `product_ram_type`
--

INSERT INTO `product_ram_type` (`id`, `product_id`, `ram_type_id`) VALUES
(3, 7, 1),
(4, 3, 2),
(5, 3, 1);

--
-- Dumping data for table `product_socket`
--

INSERT INTO `product_socket` (`id`, `product_id`, `socket_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);

--
-- Dumping data for table `ram_type`
--

INSERT INTO `ram_type` (`id`, `ram_type_name`) VALUES
(4, 'DDR2'),
(3, 'DDR3'),
(1, 'DDR4'),
(2, 'DDR5');

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

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `sub_category_name`) VALUES
(2, 'AMD'),
(1, 'Intel'),
(3, 'NVIDIA');

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('15053362-9661-4415-942b-0f648e17f04f', '29b1d056f7acb8bcd5330bf15a44e303ab0415bee0a0922e98c4d113235a42ff', '2024-11-16 12:47:04.677', '20241022073955_snake_casing_auth', NULL, NULL, '2024-11-16 12:47:04.644', 1),
('3780b800-b8f5-4f0a-af42-94edc05f2309', '95b0aee4ebf5065812d66c84281090fef5c5050f70d49275cf0501c793cc362f', '2024-11-16 12:47:04.644', '20241021081728_init_auth', NULL, NULL, '2024-11-16 12:47:04.322', 1),
('63ffee72-a495-47ee-942d-e59e2a8d5729', '68494473ad5036f6bf4a057f1b109c7732382c4b4ffb98bcf8bdf74590a1e2cf', '2024-11-16 12:47:05.687', '20241116124705_auth_implement', NULL, NULL, '2024-11-16 12:47:05.661', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
