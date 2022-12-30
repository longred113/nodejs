-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 13, 2022 lúc 10:08 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bds_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `email`) VALUES
(1, 'long', '$2b$10$i9crYpUcAqytCyjDipWp9e0puqCD308VPjNtuMkLmd6N05af2aFbK', 'longle36510@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `categoryName`) VALUES
(2, 'nhà ở'),
(3, 'phòng trọ'),
(4, 'chung cư'),
(5, 'căn hộ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `price` int(20) NOT NULL,
  `detail` text NOT NULL,
  `image` longtext DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `area` double NOT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `productName`, `address`, `price`, `detail`, `image`, `id_category`, `area`, `status`) VALUES
(1, 'Căn hộ mini', '209/138 Nơ Trang Long, Phường 12, Quận Bình Thạnh, Tp Hồ Chí Minh', 5500000, 'Nội thất đầy đủ, có thang máy tiện lợi, nội thất sang trọng, thuận tiện ra các quận trung tâm', '1652693082934-tải xuống (2).jpg', 5, 40, 'Cho thuê'),
(2, 'Nhà ở biệt thự', 'Trần Bình Trọng ,P5 Quận Bình Thạnh, TP Hồ Chí Minh', 552600000, '1PN -Bếp Riêng Ban Công', '1652078937789-tải xuống.jpg', 2, 120, 'Mua bán'),
(3, 'Căn hộ cao cấp', '46/3 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh, TP Hồ Chí Minh', 125000000, 'Căn hộ ban công cực thoáng, có chỗ đậu ô tô', '1652079062870-biet-thu-hoa-hong-villa-terrasse-des-roses-1.jpg', 5, 90, 'Mua bán'),
(4, 'giường con nhộng', '99 Đinh Bộ Lĩnh,Phường 26,Quận Bình Thạnh, TP Hồ Chí Minh', 100000, 'An ninh tuyệt đối: Ra vào cửa khoá vân tay, camera an ninh, thuộc khu vực đảm bảo an ninh trật tự, giờ giấc tự do', '1652078959021-capsule-hotel-la-gi.jpg', 1, 8, 'Cho thuê'),
(5, 'homestay Vũng Tàu', NULL, 300000, 'Chỗ ở sạch sẽ, có hồ bơi', '1652078980485-homestay-vung-tau.jpg', 5, 45, NULL),
(6, 'nhà trọ mới xây', NULL, 2500000, 'rộng rãi, sạch sẽ', '1652079000482-tải xuống (1).jpg', 2, 20, NULL),
(7, 'KTX', NULL, 1200000, 'mới xây, đầy đủ nội thất, tiện lợi ra trung tâm thành phố', '1652081860021-tải xuống (3).jpg', 3, 30, NULL),
(9, 'chung cư cao cấp', NULL, 6000000, 'mới', '1652079085755-BEP.png', 4, 40, NULL),
(10, 'nhà trọ giá rẻ', NULL, 1000000, 'nội thất cơ bản', '1652079095538-bg-3.jpg', 3, 15, NULL),
(11, 'nhà nghỉ', NULL, 200000, 'mới xây', '1652079110373-1-2-800x500.jpg', 1, 20, NULL),
(13, 'chung cư giá rẻ', NULL, 3000000, 'an ninh', '1652078676858-images.jpg', 4, 30, NULL),
(18, 'nhà trọ', '3123 Phạm Văn Đồng', 5167844, 'fgagagag', '1652944324438-277306949_499747065122685_2620583215980376708_n (1).jpg', 3, 35, 'Cho thuê');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `password`, `email`, `phoneNumber`, `address`, `email_verified_at`) VALUES
(1, 'Lê', 'Long', '$2b$10$yoFp3N6yI4FZLy7nrYnHtO5J2GHHUltRcU5cwi6R6JhLppXBFAbEG', 'longle36510@gmail.com', '0926151503', 'pham van dong', '2022-05-11 07:59:35'),
(2, 'chu', 'văn', '$2b$10$B6KB236CXdGTDuzkUz2aMOiQ2pbLYhkuHqmp3IC8bEiHI9lwa58Gq', 'longlehuy35610@gmail.com', NULL, NULL, '2022-05-05 04:48:31');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
