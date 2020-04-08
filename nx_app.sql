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

 Date: 27/03/2020 16:20:24
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
  `camera_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status_id` int(11) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of camera
-- ----------------------------
BEGIN;
INSERT INTO `camera` VALUES (30, 'New Maker', 'http://210.245.35.97:7001/media/8c80a79e-7285-a051-b785-2ef7661db57a.mp4', 0.7489583333333333, 0.6993006993006993, 101, '8c80a79e-7285-a051-b785-2ef7661db57a', 3, '2020-03-23 00:52:32', '2020-03-26 21:48:17');
INSERT INTO `camera` VALUES (47, 'New Maker', NULL, 0.125, 0.5074925074925075, 102, '8c80a79e-7285-a051-b785-2ef7661db57a', 3, '2020-03-25 23:51:36', '2020-03-26 21:48:17');
COMMIT;

-- ----------------------------
-- Table structure for layouts
-- ----------------------------
DROP TABLE IF EXISTS `layouts`;
CREATE TABLE `layouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `nx_layout_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of layouts
-- ----------------------------
BEGIN;
INSERT INTO `layouts` VALUES (101, 'SITE 1', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{34850e3d-3021-44da-a5d6-19dcdefe0c5e}', 1, 1, '2020-03-20 04:39:21', '2020-03-27 05:19:46');
INSERT INTO `layouts` VALUES (102, 'SITE 2', '1e673801-8daa-18a3-d924-302ebdfbef33.jpg', '{ef6efb13-6a53-4e28-b4fd-7bdd0a0cacce}', 1, 2, '2020-03-20 04:39:21', '2020-03-27 04:26:44');
INSERT INTO `layouts` VALUES (106, 'SITE 3', '2e2c6ee6-7f5e-764b-9219-6bd0b4e3c044.jpg', '{d161c69b-b8b9-426b-b256-69588284484f}', 1, 3, '2020-03-27 00:44:30', '2020-03-27 04:26:44');
INSERT INTO `layouts` VALUES (107, 'SITEN', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{d0d87eeb-7965-432f-a57d-2a22835173ee}', 1, 4, '2020-03-27 05:11:33', '2020-03-27 05:19:47');
INSERT INTO `layouts` VALUES (108, 'SITEX', '6b26975c-a3c4-a7e4-33c5-5197d9d110b8.jpg', '{70c39886-f957-47a5-a848-04449b32c8f4}', 1, 5, '2020-03-27 05:18:58', '2020-03-27 05:19:47');
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
