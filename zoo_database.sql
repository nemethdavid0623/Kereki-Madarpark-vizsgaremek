-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 28. 15:17
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `zoo_database`
--
CREATE DATABASE IF NOT EXISTS `zoo_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `zoo_database`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `animal`
--

CREATE TABLE `animal` (
  `ID` int(11) NOT NULL,
  `SpeciesName` varchar(150) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `ForSaleQuantity` int(11) NOT NULL,
  `Description` text DEFAULT NULL,
  `More` varchar(200) DEFAULT NULL,
  `SpeciesID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `animal`
--

INSERT INTO `animal` (`ID`, `SpeciesName`, `Quantity`, `ForSaleQuantity`, `Description`, `More`, `SpeciesID`) VALUES
(18, 'Hullámos papagáj', 8, 3, 'A hullámos papagáj (Melopsittacus undulatus) a madarak osztályának papagájalakúak (Psittaciformes) rendjébe és a szakállaspapagáj-félék (Psittaculidae) családjába, ezen belül a lóriformák (Loriinae) alcsaládjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Hull%C3%A1mos_papag%C3%A1j', 1),
(19, 'Rozella papagáj', 9, 5, 'A keleti rozella (Platycercus eximius), korábban rozellapapagáj, a madarak osztályának papagájalakúak (Psittaciformes) rendjébe és a szakállaspapagáj-félék (Psittaculidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Platycercus', 1),
(20, 'Rózsafejű törpepapagáj', 5, 1, 'A rózsásfejű törpepapagáj (Agapornis roseicollis) a madarak osztályának a papagájalakúak (Psittaciformes) rendjébe, ezen belül a szakállaspapagáj-félék (Psittaculidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/R%C3%B3zs%C3%A1sfej%C5%B1_t%C3%B6rpepapag%C3%A1j', 1),
(21, 'Hegyi Kea', 4, 0, 'A hegyi kea, más néven kea ([ˈkiː.ə]; Māori: [kɛ.a]; Nestor notabilis) a papagájalakúak (Psittaciformes) rendjébe és a bagolypapagáj-félék (Strigopoidea) öregcsaládjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Hegyi_kea', 1),
(22, 'Jácintkék ara', 6, 3, 'A jácintara (Anodorhynchus) a madarak osztályának papagájalakúak (Psittaciformes) rendjében, a papagájfélék (Psittacidae) családjában, az araformák (Arinae) alcsaládjának egyik neme.', 'https://hu.wikipedia.org/wiki/Anodorhynchus', 1),
(23, 'Bukázó sas', 3, 1, 'A bukázósas (Terathopius ecaudatus) a vágómadár-alakúak (Accipitriformes) rendjébe, ezen belül a vágómadárfélék családjába tartozó faj', 'https://hu.wikipedia.org/wiki/Buk%C3%A1z%C3%B3sas', 1),
(24, 'Sisakos kazuár', 2, 0, 'A sisakos kazuár vagy déli kazuár (Casuarius casuarius) a madarak osztályába, a struccalakúak (Struthioniformes) rendjébe és a kazuárfélék (Casuariidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Sisakos_kazu%C3%A1r', 1),
(25, 'Kacagójancsi', 8, 4, 'A kacagójancsi, más néven kacagó kokabura (Dacelo novaeguineae) a madarak (Aves) osztályának szalakótaalakúak (Coraciiformes) rendjébe, ezen belül a jégmadárfélék (Alcedinidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Kacag%C3%B3jancsi', 1),
(26, 'Emu', 3, 1, 'Az emu (Dromaius novaehollandiae) a madarak osztályának struccalakúak (Struthioniformes) rendjébe, az emufélék (Dromaiidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Emu', 1),
(27, 'Gatyás ölyv', 5, 2, 'A gatyás ölyv (Buteo lagopus) a madarak osztályának vágómadár-alakúak (Accipitriformes) rendjébe, ezen belül a vágómadárfélék (Accipitridae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Gaty%C3%A1s_%C3%B6lyv', 1),
(28, 'Tengeri Malac', 12, 6, 'A tengerimalac vagy más néven dinnyedisznó (Cavia porcellus) a rágcsálók (Rodentia) rendjén belül a Cavia nemhez tartozó, külsőre leginkább nyúlra emlékeztető, de nála valamivel kisebb testű emlős.', 'https://hu.wikipedia.org/wiki/Tengerimalac', 2),
(29, 'Házi nyúl', 6, 4, 'A házi nyúl (Oryctolagus cuniculus var. domestica) az emlősök osztályának a nyúlalakúak (Lagomorpha) rendjébe, ezen belül a nyúlfélék (Leporidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/H%C3%A1zi_ny%C3%BAl', 2),
(30, 'Csincsilla', 5, 1, 'A csincsilla vagy gyapjas csincsilla (Chinchilla lanigera) az emlősök (Mammalia) osztályának rágcsálók (Rodentia) rendjébe, ezen belül a csincsillafélék (Chinchillidae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/Csincsilla', 2),
(31, 'Északi repülőmókus', 6, 3, 'Az északi repülőmókus (Glaucomys sabrinus) az emlősök (Mammalia) osztályának a rágcsálók (Rodentia) rendjébe, ezen belül a mókusfélék (Sciuridae) családjába tartozó faj.', 'https://hu.wikipedia.org/wiki/%C3%89szaki_rep%C3%BCl%C5%91m%C3%B3kus', 2),
(32, 'Görény', 4, 1, 'A közönséges görény (Mustela putorius), vagy európai (erdei) görény, az emlősök (Mammalia) osztályának a ragadozók (Carnivora) rendjébe, ezen belül a menyétfélék (Mustelidae) családjába és a menyétformák (Mustelinae) alcsaládjába tartozó faj.', 'https://hu.wikipedia.org/wiki/K%C3%B6z%C3%B6ns%C3%A9ges_g%C3%B6r%C3%A9ny', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `image`
--

CREATE TABLE `image` (
  `ID` int(11) NOT NULL,
  `ImageData` varchar(255) DEFAULT NULL,
  `AnimalID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `image`
--

INSERT INTO `image` (`ID`, `ImageData`, `AnimalID`) VALUES
(20, '1771148966_Hullamos Papagaj.jpg', 18),
(21, '1771149167_Rozella Papagaj.jpg', 19),
(23, '1771149392_Hegyi Kea.jpg', 21),
(24, '1771149530_Jácintkek Ara.jpg', 22),
(26, '1771149898_Sisakos Kazuar.jpg', 24),
(28, '1771150131_Gatyas Olyv.jpg', 27),
(29, '1771150161_Emu.jpg', 26),
(30, '1771150233_Tengerimalac.jpg', 28),
(31, '1771150293_Hazi Nyul.jpg', 29),
(32, '1771150343_Csincsilla.jpg', 30),
(34, '1771150552_Goreny.jpg', 32),
(35, '1771779352_Rozsafeju Torpepapagaj.jpg', 20),
(36, '1771779366_Bukazo Sas.jpg', 23),
(37, '1771779383_Repulo Mokus.jpeg', 31),
(38, '1771779405_Borzas Kacagojancsi.jpg', 25);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(13, '0001_01_01_000000_create_users_table', 1),
(14, '0001_01_01_000001_create_cache_table', 1),
(15, '0001_01_01_000002_create_jobs_table', 1),
(16, '2026_01_04_160812_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `openinghours`
--

CREATE TABLE `openinghours` (
  `ID` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `openings`
--

CREATE TABLE `openings` (
  `id` int(11) NOT NULL,
  `day` varchar(20) NOT NULL,
  `open_time` time DEFAULT '08:00:00',
  `close_time` time DEFAULT '17:00:00',
  `is_closed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `openings`
--

INSERT INTO `openings` (`id`, `day`, `open_time`, `close_time`, `is_closed`, `created_at`, `updated_at`) VALUES
(1, 'Hétfő', '08:00:00', '18:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:09'),
(2, 'Kedd', '08:00:00', '17:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:22'),
(3, 'Szerda', '08:00:00', '17:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:25'),
(4, 'Csütörtök', '08:00:00', '17:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:26'),
(5, 'Péntek', '08:00:00', '17:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:30'),
(6, 'Szombat', '09:00:00', '16:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:31'),
(7, 'Vasárnap', '01:00:00', '23:00:00', 0, '2026-02-28 13:48:40', '2026-02-28 13:14:35');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(7, 'App\\Models\\User', 3, 'api-token', '2994b794e4d38c273f9b68a8198171a71cdc8cd2eb159752fcc49b701fd39211', '[\"*\"]', '2026-02-07 14:22:14', NULL, '2026-02-07 14:12:52', '2026-02-07 14:22:14'),
(9, 'App\\Models\\User', 3, 'api-token', '60590a9a2e91d5f301e5e297f8dd4178887d16b97aa3b695ab2018c7e355d6ce', '[\"*\"]', NULL, NULL, '2026-02-09 18:03:22', '2026-02-09 18:03:22'),
(12, 'App\\Models\\User', 3, 'api-token', 'da0e866b9d0fb90050a256b8d646cac019793c3ed16f03adb22abd9f8d76deb5', '[\"*\"]', '2026-02-10 11:49:21', NULL, '2026-02-10 11:40:29', '2026-02-10 11:49:21'),
(13, 'App\\Models\\User', 3, 'api-token', '793b34142a13abc544681ab5a6016ac3461f5c33d59c27a66a5f761408c243d7', '[\"*\"]', NULL, NULL, '2026-02-10 11:53:24', '2026-02-10 11:53:24'),
(16, 'App\\Models\\User', 3, 'api-token', '380f93c3875dec34e08df8910d0d0223fffaa5fe70af08b300a24de8ed0e2a4a', '[\"*\"]', '2026-02-10 17:45:28', NULL, '2026-02-10 17:45:16', '2026-02-10 17:45:28'),
(21, 'App\\Models\\User', 3, 'api-token', 'f0d43c7ba1e75fca1cdabb50d69e87276a27fcd5437952408998e12b2c77b258', '[\"*\"]', '2026-02-10 17:58:54', NULL, '2026-02-10 17:58:17', '2026-02-10 17:58:54'),
(22, 'App\\Models\\User', 3, 'api-token', 'c146c381e665674ae2e4d1cb76ae1478bd42a63d6403851e263e97640dd9c16c', '[\"*\"]', NULL, NULL, '2026-02-10 18:03:06', '2026-02-10 18:03:06'),
(23, 'App\\Models\\User', 3, 'api-token', '7f634e2a15074d4dab1dbdde3357fd6b5a19a59a71fc7a8afc07278978b2c25f', '[\"*\"]', '2026-02-10 18:10:20', NULL, '2026-02-10 18:09:27', '2026-02-10 18:10:20'),
(25, 'App\\Models\\User', 3, 'api-token', 'd8ce1028ec2126b612cce0f986f3e661e81545dbdc0a62865763e6ff2ad0f212', '[\"*\"]', '2026-02-10 18:59:45', NULL, '2026-02-10 18:53:23', '2026-02-10 18:59:45'),
(27, 'App\\Models\\User', 3, 'api-token', '33cb3c715f6ca339f23c25b3d22f5beaac993154e22b244cfd7c5c2d586d2b23', '[\"*\"]', '2026-02-15 08:15:55', NULL, '2026-02-15 08:15:30', '2026-02-15 08:15:55'),
(29, 'App\\Models\\User', 3, 'api-token', 'e70266ecfeeb6031539cf6ba45ee0d2d6914815521081e9694f22bd48f37d2b5', '[\"*\"]', NULL, NULL, '2026-02-16 07:39:09', '2026-02-16 07:39:09'),
(32, 'App\\Models\\User', 3, 'api-token', '8a86f028af6cc7127f8e61ae27a8913573e9c29f6400262731da28cf59a8f1bf', '[\"*\"]', NULL, NULL, '2026-02-22 15:50:43', '2026-02-22 15:50:43'),
(35, 'App\\Models\\User', 3, 'api-token', '9da164537a4cbbc0bfc7cfe11a48e657fed7fbed2e20b6b1ff7660d6b8f4a39b', '[\"*\"]', NULL, NULL, '2026-02-23 07:39:02', '2026-02-23 07:39:02');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6Z8hqRHVzWDhM0jsqxu728fJkmBk9g0Zj4vpZXuM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSEowdjdxSlVEZWVGbzZZOGRpRzA4TTFGNmhPeTJMWDc4TjI2UGxTNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771835899),
('EAgkpKLHt0xYuKtXMFZWnZyi2BFYZRnSJmhKo1p5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic2RyWDlHUDVTN25xQkdvMmExN2NOcVh5YXBpRXAyNlZxd0w1ekJUWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771779874),
('Mq5iWrm1ivmAJS5qOad3p6DWcjTsrAvhNhjBOwdh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY25teDYyYWxIOUNES1dxMmhzcU5aYTduN0dvZjFGTUhENzNHbUo0MSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771229264),
('OR8ikY0mR39v4mD5bmIyxXh56C9sHnS0VUkwzhg3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZTdGMmdqTmo2T1FjWU1DSlJkYWN0d1Y0czdETzdsaUxKNUsyZTdDTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771759918),
('oVKL1W54bgu6RC7kAvpVtgeoivLOAMLE4Qow9XPU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFJLYkRQOGZodVZCUVJMcmJ5N0RNVk5hVnZxTUZ5U09zNjk5QlNMdiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771232479);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `species`
--

CREATE TABLE `species` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `species`
--

INSERT INTO `species` (`ID`, `Name`) VALUES
(1, 'Madár'),
(2, 'Egyéb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'admin', NULL, NULL, '$2y$12$yXSksLAP.WXtY9Cv1PxBr.ZDBiZrguYG7wpYXfhlIpTsSRpGj7BHy', NULL, '2026-01-20 11:56:31', '2026-01-20 11:56:31');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_animal_class` (`SpeciesID`);

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_animal` (`AnimalID`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `openinghours`
--
ALTER TABLE `openinghours`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `openings`
--
ALTER TABLE `openings`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `animal`
--
ALTER TABLE `animal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `image`
--
ALTER TABLE `image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `openinghours`
--
ALTER TABLE `openinghours`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `openings`
--
ALTER TABLE `openings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `species`
--
ALTER TABLE `species`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `fk_animal_class` FOREIGN KEY (`SpeciesID`) REFERENCES `species` (`ID`);

--
-- Megkötések a táblához `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_animal` FOREIGN KEY (`AnimalID`) REFERENCES `animal` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
