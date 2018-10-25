-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 20, 2018 at 07:47 PM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_ip_details`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE IF NOT EXISTS `user_details` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IP` varchar(15) NOT NULL,
  `City` varchar(25) NOT NULL,
  `State` varchar(25) NOT NULL,
  `Zip` int(11) NOT NULL,
  `Country` varchar(25) NOT NULL,
  `Device` varchar(10) NOT NULL,
  `Proxy` tinyint(1) NOT NULL DEFAULT '0',
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  `Time` varchar(15) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IP` (`IP`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`ID`, `IP`, `City`, `State`, `Zip`, `Country`, `Device`, `Proxy`, `Latitude`, `Longitude`, `Time`) VALUES
(1, '106.77.94.118', 'Ahmedabad', 'Gujarat', 380007, 'India', 'Computer', 0, 23.0333, 72.6167, ''),
(2, '106.66.49.243', 'Ahmedabad', 'Gujarat', 380009, 'India', 'Computer', 0, 23.0333, 72.6167, '0'),
(3, '1.38.76.212', 'Rajkot', 'Gujarat', 360001, 'India', 'Computer', 0, 22.3, 70.7833, '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
