-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2023 a las 15:37:13
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_cursos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `categorie_id` bigint(20) DEFAULT NULL,
  `estado` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `imagen`, `categorie_id`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Desarrollo', 'categories/LNTKdER4OErbiJgMs3GgBWH4lVy5L6g3TlMPXtv5.png', NULL, 1, '2023-09-26 16:43:47', '2023-09-26 16:43:47'),
(2, 'Hardware', 'categories/soCaiYnPh4gSKCK7DY5Y6sArUnDJMj2UEa7sGubr.png', NULL, 1, '2023-09-26 16:44:46', '2023-09-26 16:44:46'),
(3, 'Análisis de datos', 'categories/teuEz6KHfabyt6QYwM7OPpqK0duds7jwu7UDyfMp.png', NULL, 1, '2023-09-26 16:45:23', '2023-09-26 16:45:23'),
(4, 'Desarrollo Web', NULL, 1, 1, '2023-09-26 16:45:50', '2023-09-26 16:45:50'),
(5, 'Desarrollo móvil', NULL, 11, 1, '2023-09-26 16:46:24', '2023-10-24 21:37:01'),
(6, 'Redes', NULL, 2, 1, '2023-09-26 16:46:52', '2023-09-26 16:46:52'),
(7, 'Soporte técnico', NULL, 2, 1, '2023-09-26 16:47:23', '2023-09-26 16:47:23'),
(8, 'Power BI', NULL, 3, 1, '2023-09-27 13:34:30', '2023-09-27 17:11:03'),
(9, 'Ventas y Marketing', 'categories/694sSOEIYs88dup9vAy1VAn3JQJrzmDyyOXWSeW0.png', NULL, 1, '2023-10-24 21:32:11', '2023-10-24 21:34:35'),
(10, 'Arte y humanidades', 'categories/jOFnvP80PT62pLCXS2DJ5zPsVRuI1DFmTkZigurH.png', NULL, 1, '2023-10-24 21:33:06', '2023-10-24 21:33:06'),
(11, 'Aplicaciones móviles', 'categories/acDruhX15eK3s5x2f2h7kAolfuY85FUGsP0Lk5OM.png', NULL, 1, '2023-10-24 21:34:06', '2023-10-24 21:34:06'),
(12, 'Diseño grafico', 'categories/pRGSpTTR6LMllWaCl38awRMkLBahHGchrExlEGB3.png', NULL, 1, '2023-10-24 21:35:08', '2023-10-24 21:35:08'),
(13, 'Desarrollo personal', 'categories/DOcI0U3YXdqidExg7gvGTnyyLUvvBpBuioQkci6h.png', NULL, 1, '2023-10-24 21:35:57', '2023-10-24 21:35:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coupon_categories`
--

CREATE TABLE `coupon_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coupon_categories`
--

INSERT INTO `coupon_categories` (`id`, `coupon_id`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2023-10-17 16:11:28', '2023-10-17 16:11:28'),
(2, 3, 1, '2023-10-17 16:12:28', '2023-10-17 16:12:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coupon_courses`
--

CREATE TABLE `coupon_courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coupon_courses`
--

INSERT INTO `coupon_courses` (`id`, `coupon_id`, `course_id`, `created_at`, `updated_at`) VALUES
(20, 1, 7, '2023-10-17 21:22:30', '2023-10-17 21:22:30'),
(21, 1, 1, '2023-10-17 21:22:30', '2023-10-17 21:22:30'),
(22, 1, 2, '2023-10-17 21:22:30', '2023-10-17 21:22:30'),
(23, 4, 6, '2023-10-17 21:39:28', '2023-10-17 21:39:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(250) NOT NULL,
  `slug` text NOT NULL,
  `subtitle` text NOT NULL,
  `imagen` varchar(250) DEFAULT NULL,
  `precio_usd` double NOT NULL DEFAULT 0,
  `precio_co` double NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sub_categorie_id` bigint(20) UNSIGNED NOT NULL,
  `level` varchar(120) NOT NULL,
  `idioma` varchar(150) NOT NULL,
  `vimeo_id` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `description` longtext CHARACTER SET utf8 NOT NULL,
  `requirements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`requirements`)),
  `who_is_it_for` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es prueba y 2 es publicado',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id`, `title`, `slug`, `subtitle`, `imagen`, `precio_usd`, `precio_co`, `user_id`, `categorie_id`, `sub_categorie_id`, `level`, `idioma`, `vimeo_id`, `time`, `description`, `requirements`, `who_is_it_for`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Laravel 10', 'laravel-10', 'Curso Laravel de 0 a experto', 'courses/942n8PvtTpJ8rzOrEiMrYM0HEhAflZRA4tZSrkHz.jpg', 30, 120000, 23, 1, 4, 'Avanzado', 'Español', '869246338', '00:00:30', '<p>Desarrolle Api Rest, utilizando el mejor framework de php</p>', '[\"PHP b\\u00e1sico\"]', '[\"Desarrolladores\"]', 2, '2023-09-26 16:50:39', '2023-09-28 17:26:59', NULL),
(2, 'Frontend con JavaScript', 'frontend-con-javascript', 'Conviértete en experto de JavaScript', 'courses/GlPlg1mqvkGaws7zN7b0ZtiV8nmtd54iZtBCnLee.jpg', 20, 80000, 23, 1, 4, 'Avanzado', 'Español', NULL, NULL, '<p>Javacript el lenguaje de programacion mas usado.</p>', '[\"JavaScript basico\"]', '[\"Desarrolladores\",\"Dise\\u00f1adores web\"]', 2, '2023-09-26 16:53:28', '2023-09-27 17:07:09', NULL),
(3, 'APPS con Flutter', 'apps-con-flutter', 'Crea apps para IOS y Android', 'courses/A13SVvnlgRIFEYux58jJGhPhwTmTiz2yVO9AnzvL.jpg', 150, 100000, 23, 1, 5, 'Intermedio', 'Español', NULL, NULL, '<p>Desarrolla apps para todo tipo de dispositivo movil</p>', '[\"Dark\"]', '[\"Desarrolladores\",\"Desarrolladores apps\"]', 2, '2023-09-26 16:55:52', '2023-09-27 17:06:37', NULL),
(4, 'Redes básico', 'redes-basico', 'Aprende a crear una red básica', 'courses/ILoebujhvK1915U9h51CYLdx6YnBRWKMHfqLFEA5.jpg', 30, 150000, 23, 2, 6, 'Intermedio', 'Español', NULL, NULL, '<p>Realiza redes de computadoras</p>', '[\"Computaci\\u00f3n\"]', '[\"Ing. de sistemas\",\"T\\u00e9cnicos de redes\"]', 2, '2023-09-26 16:57:49', '2023-09-27 17:06:44', NULL),
(5, 'Soporte técnico', 'soporte-tecnico', 'Curso de soporte técnico', 'courses/XHnNCamqeSTli4GKLgCiPRSAM2wQcn8Ud2ly0eXM.jpg', 35, 120000, 23, 2, 7, 'Intermedio', 'Español', NULL, NULL, '<p>Todo sobre soporte tecnico de hardware</p>', '[\"Computacion\"]', '[\"Ing. de sistemas\",\"Tecn\\u00f3logos de sistemas\"]', 1, '2023-09-26 16:59:57', '2023-09-27 17:15:32', NULL),
(6, 'Análisis de datos con Power BI', 'analisis-de-datos-con-power-bi', 'Conviértete en un experto en análisis de datos', 'courses/EVsJ1TpyvjDFGROMCfKp49CwezJzbeumHFCM3zIb.jpg', 45, 140000, 24, 3, 8, 'Intermedio', 'Español', NULL, NULL, '<p>Aprende lo que las empresas estan buscando, el analisis de datos se ha convertido en un valor agregado en las empresas.</p>', '[\"Base de datos\",\"Computaci\\u00f3n\"]', '[\"Administradores\",\"Ingenieros\",\"Analistas de datos\",\"Empresas de software\"]', 2, '2023-09-27 13:37:52', '2023-09-27 17:15:26', NULL),
(7, 'React y Node JS', 'react-y-node-js', 'Fullstack en react + node js', 'courses/Gp3wLHUB6a3drmOUhAUEII3wpBnfVQK5Uk2Cukln.jpg', 200, 800000, 23, 1, 4, 'Avanzado', 'Español', '869217519', '00:01:03', '<p>Conviertete en un desarrollador Fullstack en react + node js</p>', '[\"JavaScript\",\"Programaci\\u00f3n b\\u00e1sica\"]', '[\"Desarrolladores\",\"Ing. de Sistemas\",\"Programadores\"]', 2, '2023-09-27 15:22:27', '2023-09-28 16:11:54', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course_clases`
--

CREATE TABLE `course_clases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_section_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` longtext CHARACTER SET utf8 NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1 es activo',
  `vimeo_id` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `course_clases`
--

INSERT INTO `course_clases` (`id`, `course_section_id`, `name`, `description`, `state`, `vimeo_id`, `time`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'Introducción', '<p>Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors about driving and keep you focused on the overall structure of your post</p>', 1, '872952886', '00:00:14', '2023-10-06 19:08:33', '2023-10-10 17:13:44', NULL),
(2, 3, 'Primeros pasos', '<p>Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors about driving and keep you focused on the overall structure of your post</p>', 1, NULL, '00:00:14', '2023-10-06 20:01:18', '2023-10-06 22:09:16', NULL),
(3, 3, 'prueba', '<p>fafdad</p>', 1, NULL, '00:00:14', '2023-10-10 17:16:37', '2023-10-11 00:52:20', '2023-10-11 00:52:20'),
(4, 3, 'p2', '<p>adadda</p>', 1, NULL, '00:00:14', '2023-10-10 17:24:06', '2023-10-11 00:52:17', '2023-10-11 00:52:17'),
(5, 3, 'p3', '<p>da gg dg drg</p>', 1, NULL, '00:00:14', '2023-10-10 17:29:05', '2023-10-11 00:52:14', '2023-10-11 00:52:14'),
(6, 3, 'p4', '<p>wfwf&nbsp; fw fw fw fwf w</p>', 1, NULL, '00:00:14', '2023-10-10 18:34:10', '2023-10-11 00:52:10', '2023-10-11 00:52:10'),
(7, 3, 'p5', '<p>fds fs fsdf ggfwr ff sfs&nbsp;</p>', 1, NULL, '00:00:14', '2023-10-10 18:43:31', '2023-10-11 00:52:06', '2023-10-11 00:52:06'),
(8, 3, 'p6', '<p>sf s wrt rtwef w r e</p>', 1, NULL, '00:00:14', '2023-10-10 18:51:24', '2023-10-11 00:52:03', '2023-10-11 00:52:03'),
(9, 3, 'p7', '<p>adAD AFADDD&nbsp;</p>', 1, NULL, '00:00:14', '2023-10-10 19:05:15', '2023-10-11 00:51:40', '2023-10-11 00:51:40'),
(10, 7, 'Primeros pasos', '<p>Aqui encontraras los pasos para comenzar</p>', 1, NULL, '00:05:14', '2023-10-25 19:54:58', '2023-10-25 19:54:58', NULL),
(11, 7, 'Lo que necesitas', '<p>Lo que necesitas para comenzar</p>', 1, NULL, '00:25:14', '2023-10-25 19:55:59', '2023-10-25 19:55:59', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course_clase_files`
--

CREATE TABLE `course_clase_files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_clase_id` bigint(20) UNSIGNED NOT NULL,
  `name_file` varchar(250) NOT NULL,
  `size` varchar(50) NOT NULL,
  `time` varchar(50) DEFAULT NULL,
  `resolution` varchar(20) DEFAULT NULL,
  `file` varchar(250) NOT NULL,
  `type` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `course_clase_files`
--

INSERT INTO `course_clase_files` (`id`, `course_clase_id`, `name_file`, `size`, `time`, `resolution`, `file`, `type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'COMUNICADO USO DEL ASCENSOR.pdf', '358093', NULL, NULL, 'clases_files/lobL3wFXUvPyTa2jZWIhXgtIA7qBILgy5aowr798.pdf', 'pdf', '2023-10-06 19:08:33', '2023-10-06 19:08:33', NULL),
(2, 1, 'TAREA DULCE.docx', '1251157', NULL, NULL, 'clases_files/yoyYcnFqVMYGdZwi7483MRwC6wHjcI21KyIadVYg.docx', 'docx', '2023-10-06 19:08:33', '2023-10-06 19:08:33', NULL),
(3, 1, 'dentist-tools.png', '13422', NULL, '512 X 512', 'clases_files/xm8MFwkqYyIxQJt7LwZN9WCke5lLWK2VlnJ91cOd.png', 'png', '2023-10-06 19:08:33', '2023-10-06 19:08:33', NULL),
(4, 2, 'COMUNICADO INTERNO-.pdf', '225097', NULL, NULL, 'clases_files/uFlvBnwIesQkewWnmXIVNsFrAnuUn1pSrS2c5CD8.pdf', 'pdf', '2023-10-06 20:01:18', '2023-10-06 20:01:18', NULL),
(5, 1, 'ACTA DE LEVANTAMIENTODE REQUERIMIENTO.docx', '33005', NULL, NULL, 'clases_files/8E2Ao0WiVvOOKsWYEmlYWyNRRO3JePaeo9JUEiVB.docx', 'docx', '2023-10-10 15:09:32', '2023-10-10 21:56:22', '2023-10-10 21:56:22'),
(6, 1, 'Boletín de prensa 228 - Receso escolar medidas preventivas Dengue.pdf', '314389', NULL, NULL, 'clases_files/QBcmxE2kL8n7GM7EEWHJ7QI5DOc0Ilpx9AJjCqIW.pdf', 'pdf', '2023-10-10 15:12:10', '2023-10-10 21:56:02', '2023-10-10 21:56:02'),
(7, 3, 'permiso-sept.docx', '106615', NULL, NULL, 'clases_files/eAVEMTZXa8UHCPVFE2pMowwOqktGXsZORQDwcJlp.docx', 'docx', '2023-10-10 17:16:37', '2023-10-10 17:16:37', NULL),
(8, 4, 'permiso-sept.docx', '106615', NULL, NULL, 'clases_files/rrxWyDLkAzeR8V6bDtOAQ7aQqGPj9JZnMcdSMPhT.docx', 'docx', '2023-10-10 17:24:06', '2023-10-10 17:24:06', NULL),
(9, 5, 'permiso-sept.docx', '106615', NULL, NULL, 'clases_files/45qEv5iC8y6NxoO77uNNyrl0zhdx4XWegUj8fEk5.docx', 'docx', '2023-10-10 17:29:05', '2023-10-10 17:29:05', NULL),
(10, 6, 'permiso-sept.docx', '106615', NULL, NULL, 'clases_files/4I4ghr3TZAp1dwyoaPQQdCfkXyhyBkNVaZvoKtAG.docx', 'docx', '2023-10-10 18:34:10', '2023-10-10 18:34:10', NULL),
(11, 7, 'TAREA DULCE.docx', '1251157', NULL, NULL, 'clases_files/89lLOsP5ZsQlLNb5G2TsvU9iIxi7wneqhYGgB387.docx', 'docx', '2023-10-10 18:43:32', '2023-10-10 18:43:32', NULL),
(12, 8, 'TAREA DULCE.docx', '1251157', NULL, NULL, 'clases_files/4UR5iJvBW5izNLm3VeC14ZTBEXazwQJXjuv4tAuS.docx', 'docx', '2023-10-10 18:51:24', '2023-10-10 18:51:24', NULL),
(13, 9, 'register.png', '19974', NULL, '719 X 165', 'clases_files/WcDkqKxOsaIe1g51sNn07v7TY0GFGIpdNPLUXd0q.png', 'png', '2023-10-10 19:05:15', '2023-10-10 19:05:15', NULL),
(14, 10, 'viaticos.pdf', '367866', NULL, NULL, 'clases_files/bemimhkEdzDixRkblAoDv0XFreXRvX6N5bULB799.pdf', 'pdf', '2023-10-25 19:54:58', '2023-10-25 19:54:58', NULL),
(15, 11, 'Copia de Formulario de Inscripción al Programa de semilleros (respuestas).xlsx', '6513', NULL, NULL, 'clases_files/1dK31KRw5IzGAf3syZApuCGJSDLmTCXWtU0cwfXl.xlsx', 'xlsx', '2023-10-25 19:55:59', '2023-10-25 19:55:59', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course_sections`
--

CREATE TABLE `course_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL COMMENT '1 es activo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `course_sections`
--

INSERT INTO `course_sections` (`id`, `course_id`, `name`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 7, 'Introducción', 1, '2023-10-02 22:50:23', '2023-10-05 17:11:49', NULL),
(4, 7, 'Modulo de usuarios', 1, '2023-10-02 22:51:41', '2023-10-05 16:23:10', NULL),
(5, 7, 'Modulo de categorías', 1, '2023-10-02 22:53:34', '2023-10-02 22:53:34', NULL),
(6, 7, 'Clases', 2, '2023-10-05 17:20:12', '2023-10-05 17:22:07', NULL),
(7, 4, 'Introducción', 1, '2023-10-25 19:54:09', '2023-10-25 19:54:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupons`
--

CREATE TABLE `cupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(250) NOT NULL,
  `type_discount` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1: porcentaje 2: monto fijo',
  `discount` double NOT NULL DEFAULT 0,
  `type_count` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `num_use` double DEFAULT NULL COMMENT '1: ilimitado, 2:limitado',
  `type_coupon` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1: por curso, 2: por categoria',
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cupons`
--

INSERT INTO `cupons` (`id`, `code`, `type_discount`, `discount`, `type_count`, `num_use`, `type_coupon`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'DIAMAMA', 2, 25, 2, 20, 1, 1, '2023-10-17 16:07:09', '2023-10-17 21:22:30', NULL),
(2, 'DIAPAPA', 2, 50, 2, 30, 2, 1, '2023-10-17 16:11:28', '2023-10-17 16:11:28', NULL),
(3, 'BLACKFRIDAY', 2, 30, 2, 100, 2, 1, '2023-10-17 16:12:28', '2023-10-18 02:48:06', '2023-10-18 02:48:06'),
(4, 'sss', 1, 1, 1, 0, 1, 1, '2023-10-17 21:39:28', '2023-10-18 02:39:40', '2023-10-18 02:39:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(250) NOT NULL,
  `type_discount` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '2: porcentaje 1: monto fijo',
  `discount` double NOT NULL DEFAULT 0,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `clase_discount` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1: por curso, 2: por categoria',
  `type_campaing` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:normal, 2:flash, 3:barner',
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discounts`
--

INSERT INTO `discounts` (`id`, `code`, `type_discount`, `discount`, `start_date`, `end_date`, `clase_discount`, `type_campaing`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '6536e9d219731', 2, 10, '2023-10-23 05:00:00', '2023-10-31 05:00:00', 2, 1, 1, '2023-10-23 21:46:58', '2023-10-23 21:46:58', NULL),
(2, '653be4a570932', 2, 25, '2023-11-01 05:00:00', '2023-11-11 05:00:00', 1, 2, 2, '2023-10-23 21:48:28', '2023-10-27 16:26:13', NULL),
(3, '6538235b3f0dc', 1, 500, '2023-11-11 05:00:00', '2023-11-19 05:00:00', 2, 1, 2, '2023-10-23 21:57:59', '2023-10-24 20:04:43', NULL),
(4, '653bd85b00c29', 2, 15, '2023-10-24 05:00:00', '2023-10-31 05:00:00', 1, 3, 1, '2023-10-24 16:00:51', '2023-10-27 15:33:47', NULL),
(5, '653824b5e01a4', 1, 100, '2023-10-01 05:00:00', '2023-10-07 05:00:00', 1, 1, 1, '2023-10-24 20:10:29', '2023-10-25 01:11:24', NULL),
(6, '6538253a42712', 1, 25, '2023-10-01 05:00:00', '2023-10-07 05:00:00', 1, 1, 1, '2023-10-24 20:12:42', '2023-10-25 01:18:05', NULL),
(7, '653be46e29cd8', 2, 36, '2023-10-06 05:00:00', '2023-10-31 05:00:00', 1, 2, 1, '2023-10-24 20:13:36', '2023-10-27 16:25:18', NULL),
(8, '656611df2f0a0', 2, 10, '2023-11-28 05:00:00', '2023-12-02 05:00:00', 1, 1, 1, '2023-11-28 16:14:23', '2023-11-28 16:14:23', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discount_categories`
--

CREATE TABLE `discount_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `discount_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discount_categories`
--

INSERT INTO `discount_categories` (`id`, `discount_id`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-10-23 21:46:58', '2023-10-23 21:46:58'),
(7, 3, 3, '2023-10-24 20:04:43', '2023-10-24 20:04:43'),
(8, 3, 1, '2023-10-24 20:04:43', '2023-10-24 20:04:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `discount_courses`
--

CREATE TABLE `discount_courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `discount_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `discount_courses`
--

INSERT INTO `discount_courses` (`id`, `discount_id`, `course_id`, `created_at`, `updated_at`) VALUES
(15, 5, 4, '2023-10-24 20:10:29', '2023-10-24 20:10:29'),
(16, 6, 3, '2023-10-24 20:12:42', '2023-10-24 20:12:42'),
(22, 4, 7, '2023-10-27 15:33:47', '2023-10-27 15:33:47'),
(23, 4, 1, '2023-10-27 15:33:47', '2023-10-27 15:33:47'),
(24, 4, 2, '2023-10-27 15:33:47', '2023-10-27 15:33:47'),
(25, 4, 3, '2023-10-27 15:33:47', '2023-10-27 15:33:47'),
(27, 7, 7, '2023-10-27 16:25:18', '2023-10-27 16:25:18'),
(28, 7, 2, '2023-10-27 16:25:18', '2023-10-27 16:25:18'),
(29, 7, 1, '2023-10-27 16:25:18', '2023-10-27 16:25:18'),
(30, 2, 7, '2023-10-27 16:26:13', '2023-10-27 16:26:13'),
(31, 2, 1, '2023-10-27 16:26:13', '2023-10-27 16:26:13'),
(32, 2, 2, '2023-10-27 16:26:13', '2023-10-27 16:26:13'),
(33, 8, 7, '2023-11-28 16:14:23', '2023-11-28 16:14:23'),
(34, 8, 3, '2023-11-28 16:14:23', '2023-11-28 16:14:23'),
(35, 8, 1, '2023-11-28 16:14:23', '2023-11-28 16:14:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', '2023-07-17 17:07:23', '2023-07-17 17:07:23'),
(2, 'Estandar', '2023-07-21 20:36:29', '2023-07-21 20:36:29'),
(3, 'Tutor', '2023-07-21 20:36:29', '2023-07-21 20:36:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL COMMENT '1=adm, 2=estandar, 3=instructor',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profesion` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `tipo` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '1:cli, 2:admin',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `avatar`, `role_id`, `email_verified_at`, `password`, `profesion`, `description`, `estado`, `tipo`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jeisson', 'Olivares', 'olivaresjeisson@gmail.com', 'users/DdraEiTp9dUGLMRNMIgHuJrPOegDrSIzLc1HX7UX.png', 1, NULL, '$2y$10$vMxwk61RPzumErz1R4SGB.cX0ARcTTSYx8WOj82L4HjRJARFZLYsK', NULL, NULL, 1, 2, NULL, '2023-07-11 21:39:33', '2023-09-27 20:02:14'),
(23, 'Hernan', 'Pajaro', 'hpajaro@gmail.com', 'users/pc6A7NmgsHI7fvoarUYeZKeHaQOYyrD0KzHGfZIS.png', 3, NULL, '$2y$10$mijaeTcvW7TjgKoAo7wQX.XogFJc8RAUvemhH6mbdZfvBtHfrGIem', 'Ingeniero de sistemas', 'Tutor en desarrollo de software', 1, 2, NULL, '2023-09-27 18:27:45', '2023-09-27 18:27:45'),
(24, 'Linda', 'Perez', 'lperez@gmail.com', 'users/CsAB913ryl9305BHRBpX3bCtD9YNxlzjnchR0yuc.png', 3, NULL, '$2y$10$ZqxCMKNh27IWTcfqSAI/y.VTv0WxGgtJMVzZZGocHLa9DML6MhhL2', 'Administradora', 'Tutora de administración', 1, 2, NULL, '2023-09-27 18:29:16', '2023-09-27 22:04:06'),
(25, 'Julio', 'Lopez', 'jlopez@gmail.com', 'users/c25vMgWQNApMwRdjhm87824PQj16gCUg53z6W2ZS.png', 2, NULL, '$2y$10$pUyak/4K4D6xZKrWMm1Xfu72o6VgULXHSKFjecftE6yqUngDeOqvG', NULL, NULL, 1, 2, NULL, '2023-09-27 18:29:50', '2023-09-27 18:29:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coupon_categories`
--
ALTER TABLE `coupon_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coupon_courses`
--
ALTER TABLE `coupon_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `course_clases`
--
ALTER TABLE `course_clases`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `course_clase_files`
--
ALTER TABLE `course_clase_files`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `course_sections`
--
ALTER TABLE `course_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cupons`
--
ALTER TABLE `cupons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discount_categories`
--
ALTER TABLE `discount_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `discount_courses`
--
ALTER TABLE `discount_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `coupon_categories`
--
ALTER TABLE `coupon_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `coupon_courses`
--
ALTER TABLE `coupon_courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `course_clases`
--
ALTER TABLE `course_clases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `course_clase_files`
--
ALTER TABLE `course_clase_files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `course_sections`
--
ALTER TABLE `course_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cupons`
--
ALTER TABLE `cupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `discount_categories`
--
ALTER TABLE `discount_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `discount_courses`
--
ALTER TABLE `discount_courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
