/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3309
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3392
 Source Schema         : application

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 18/05/2020 10:29:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for camera
-- ----------------------------
DROP TABLE IF EXISTS `camera`;
CREATE TABLE `camera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `axisX` double NOT NULL,
  `axisY` double NOT NULL,
  `color` int(11) DEFAULT '0',
  `layout_id` int(11) NOT NULL,
  `camera_id` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of camera
-- ----------------------------
BEGIN;
INSERT INTO `camera` VALUES (4, 'New Maker 1', 'http://210.245.35.97:7001/media/8c80a79e-7285-a051-b785-2ef7661db57a.mp4', 0.6083333333333333, 0.3459196102314251, 0, 1, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-04-24 05:06:25', '2020-05-18 02:01:12');
INSERT INTO `camera` VALUES (14, 'New Maker', NULL, 0.3958333333333333, 0.6236297198538368, 0, 2, '1cf2beb6-3fc1-52cc-4c49-2aca85c5c69a', 1, '2020-05-13 08:54:25', '2020-05-13 08:54:25');
COMMIT;

-- ----------------------------
-- Table structure for history_track_paths
-- ----------------------------
DROP TABLE IF EXISTS `history_track_paths`;
CREATE TABLE `history_track_paths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paths` text,
  `color` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of history_track_paths
-- ----------------------------
BEGIN;
INSERT INTO `history_track_paths` VALUES (29, '[4,2,4,9,10,11,4,12,4,13,4]', 4, 1, '2020-05-13 03:10:06', '2020-05-13 08:54:47');
COMMIT;

-- ----------------------------
-- Table structure for layouts
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `nx_layout_id` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of layouts
-- ----------------------------
BEGIN;
INSERT INTO `layouts` VALUES (1, 'SITE 1', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{34850e3d-3021-44da-a5d6-19dcdefe0c5e}', 1, 1, '2020-03-30 02:56:53', '2020-05-18 01:43:55');
INSERT INTO `layouts` VALUES (2, 'SITEX', '2e2c6ee6-7f5e-764b-9219-6bd0b4e3c044.jpg', '{70c39886-f957-47a5-a848-04449b32c8f4}', 1, 2, '2020-03-30 02:56:53', '2020-05-18 01:43:55');
INSERT INTO `layouts` VALUES (3, 'SITEN', '1e673801-8daa-18a3-d924-302ebdfbef33.jpg', '{d0d87eeb-7965-432f-a57d-2a22835173ee}', 1, 3, '2020-03-30 02:56:53', '2020-05-18 01:43:55');
COMMIT;

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `color` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of person
-- ----------------------------
BEGIN;
INSERT INTO `person` VALUES (1, 'Person detected', 1, 4, 1, '2020-05-07 03:52:33', '2020-05-11 09:30:39');
INSERT INTO `person` VALUES (2, 'Tram Anh Do', 1, 5, 1, '2020-05-07 09:13:53', '2020-05-11 09:29:07');
INSERT INTO `person` VALUES (3, 'Person detected 1', 1, 6, 1, '2020-05-12 03:17:16', '2020-05-12 03:17:25');
COMMIT;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_count` int(11) DEFAULT NULL,
  `row_count` int(11) DEFAULT NULL,
  `maker_color` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of settings
-- ----------------------------
BEGIN;
INSERT INTO `settings` VALUES (1, 2, 2, 7, 1, 'admin', 'Admin@123', '210.245.35.97:7001', NULL, '2020-05-12 03:17:16');
COMMIT;

-- ----------------------------
-- Table structure for track_paths
-- ----------------------------
DROP TABLE IF EXISTS `track_paths`;
CREATE TABLE `track_paths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `color` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of track_paths
-- ----------------------------
BEGIN;
INSERT INTO `track_paths` VALUES (8, 4, 2, 4, '2020-05-13 03:10:12', '2020-05-13 03:10:12');
INSERT INTO `track_paths` VALUES (9, 4, 9, 4, '2020-05-13 03:17:10', '2020-05-13 03:17:10');
INSERT INTO `track_paths` VALUES (10, 10, 4, 4, '2020-05-13 03:17:39', '2020-05-13 03:17:39');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'pvdat', 'password', '2020-03-02 22:53:38', '2020-03-02 22:53:38');
INSERT INTO `users` VALUES (2, 'pvdat', 'password', '2020-03-02 22:59:35', '2020-03-02 22:59:35');
INSERT INTO `users` VALUES (3, 'pvdat1', 'password', '2020-03-02 23:03:52', '2020-03-02 23:03:52');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
