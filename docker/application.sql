/*
 Navicat Premium Data Transfer

 Source Server         : dasd
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3392
 Source Schema         : application

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 08/04/2020 17:23:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for camera
-- ----------------------------
DROP TABLE IF EXISTS `camera`;
CREATE TABLE `camera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `axisX` double DEFAULT NULL,
  `axisY` double DEFAULT NULL,
  `layout_id` int(11) DEFAULT NULL,
  `camera_id` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of camera
-- ----------------------------
BEGIN;
INSERT INTO `camera` VALUES (1, 'New Maker', 'http://210.245.35.97:7001/media/8c80a79e-7285-a051-b785-2ef7661db57a.mp4', 0.7458333333333333, 0.6976160602258469, 1, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-23 00:52:32', '2020-04-08 09:16:27');
INSERT INTO `camera` VALUES (2, 'New Maker', NULL, 0.15833333333333333, 0.589711417816813, 2, '1cf2beb6-3fc1-52cc-4c49-2aca85c5c69a', 1, '2020-03-25 23:51:36', '2020-04-08 06:57:50');
COMMIT;

-- ----------------------------
-- Table structure for layouts
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `nx_layout_id` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of layouts
-- ----------------------------
BEGIN;
INSERT INTO `layouts` VALUES (1, 'SITE 1', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{34850e3d-3021-44da-a5d6-19dcdefe0c5e}', 1, 1, '2020-03-30 02:56:53', '2020-04-08 10:04:52');
INSERT INTO `layouts` VALUES (2, 'SITEX', '2e2c6ee6-7f5e-764b-9219-6bd0b4e3c044.jpg', '{70c39886-f957-47a5-a848-04449b32c8f4}', 1, 2, '2020-03-30 02:56:53', '2020-04-08 10:04:52');
INSERT INTO `layouts` VALUES (3, 'SITEN', '1e673801-8daa-18a3-d924-302ebdfbef33.jpg', '{d0d87eeb-7965-432f-a57d-2a22835173ee}', 1, 3, '2020-03-30 02:56:53', '2020-04-08 10:04:52');
COMMIT;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_count` int(11) DEFAULT NULL,
  `row_count` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
