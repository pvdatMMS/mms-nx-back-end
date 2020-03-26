/*
 Navicat Premium Data Transfer

 Source Server         : 123213
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 192.168.10.78:3306
 Source Schema         : nx_app

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 26/03/2020 11:22:48
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of camera
-- ----------------------------
BEGIN;
INSERT INTO `camera` VALUES (30, 'New Maker', 'http://210.245.35.97:7001/media/8c80a79e-7285-a051-b785-2ef7661db57a.mp4', 0.7489583333333333, 0.6993006993006993, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-23 00:52:32', '2020-03-25 21:54:03');
INSERT INTO `camera` VALUES (34, 'New Maker', NULL, 0.8354166666666667, 0.5094905094905094, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 05:53:03', '2020-03-25 21:57:40');
INSERT INTO `camera` VALUES (38, 'New Maker', NULL, 0.584375, 0.4955044955044955, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 22:40:57', '2020-03-25 22:40:57');
INSERT INTO `camera` VALUES (39, 'New Maker', NULL, 0.7302083333333333, 0.5574425574425574, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 22:41:56', '2020-03-25 22:41:56');
INSERT INTO `camera` VALUES (40, 'New Maker', NULL, 0.61875, 0.6913086913086913, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 22:42:17', '2020-03-25 22:42:17');
INSERT INTO `camera` VALUES (41, 'New Maker', NULL, 0.46979166666666666, 0.5974025974025974, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 22:42:34', '2020-03-25 22:42:34');
INSERT INTO `camera` VALUES (42, 'New Maker', NULL, 0.71875, 0.3756243756243756, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 22:48:13', '2020-03-25 22:48:13');
INSERT INTO `camera` VALUES (47, 'New Maker', NULL, 0.125, 0.5074925074925075, 102, '8c80a79e-7285-a051-b785-2ef7661db57a', 1, '2020-03-25 23:51:36', '2020-03-25 23:51:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of layouts
-- ----------------------------
BEGIN;
INSERT INTO `layouts` VALUES (101, 'SITE 1', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{34850e3d-3021-44da-a5d6-19dcdefe0c5e}', 1, 1, '2020-03-20 04:39:21', '2020-03-26 00:11:40');
INSERT INTO `layouts` VALUES (102, 'SITE 2', '1e673801-8daa-18a3-d924-302ebdfbef33.jpg', '{ef6efb13-6a53-4e28-b4fd-7bdd0a0cacce}', 1, 2, '2020-03-20 04:39:21', '2020-03-26 00:11:40');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of test
-- ----------------------------
BEGIN;
INSERT INTO `test` VALUES (1, NULL, NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'pvdat', 'password', '2020-03-02 22:53:38', '2020-03-02 22:53:38');
INSERT INTO `users` VALUES (2, 'pvdat', 'password', '2020-03-02 22:59:35', '2020-03-02 22:59:35');
INSERT INTO `users` VALUES (3, 'pvdat1', 'password', '2020-03-02 23:03:52', '2020-03-02 23:03:52');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
