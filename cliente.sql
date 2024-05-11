-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2024 a las 09:04:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cliente`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `dni` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `telefono` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombres`, `apellidos`, `direccion`, `correo`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'John', 'Doe', 'Calle Falsa 123', 'john@example.com', 12345678, 30, '2024-05-06', '123-456-7890'),
(2, 'Jane', 'Smith', 'Avenida Principal 456', 'jane@example.com', 87654321, 25, '2024-05-06', '987-654-3210'),
(3, 'Alice', 'Johnson', 'Plaza Central 789', 'alice@example.com', 13579246, 35, '2024-05-06', '456-789-0123'),
(4, 'Jose', 'Guzman', 'Calle los pelicanos 345', 'joseGuz@empresa.com', 83609402, 28, '0000-00-00', '345-980-3849'),
(5, 'Rosa', 'Robles', 'Avenida Prado Oeste 776', 'rosaRob@empresa.com', 43789820, 33, '0000-00-00', '320-756-3950'),
(6, 'Alberto', 'Rodriguez', 'Plaza Grau 769', 'albertoRod@empresa.com', 45638934, 34, '0000-00-00', '934-201-4390');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
