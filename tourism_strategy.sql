/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 127.0.0.1:3306
 Source Schema         : tourism_strategy

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 15/02/2020 15:00:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:-B_B7O9A0SXEjm-d1KGPNE-PTSgarZQX', 1581698157217, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/1581428563010.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1,\"type\":2}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:-jGmMt7Zc8rrAAXJ-yq-gbwLY7JwIBZw', 1580906404690, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"/images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:09Di5JLkT1bNA6fRzqzJT-shgvKdyT89', 1581734775955, '{\"type\":2}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:5EPjqm16ArXJD-Q5B2c_Jz2jowJ0HwTH', 1581253180549, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:9l_5Zgrt5SuJ1TVzFJitz52ZShfO4iAr', 1581336047182, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:CQ6FfgT9i2FvjhP5ZI9YNKWWrE_tFlQV', 1580734213249, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"/images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:DwswNI7RU5Gd2L9KXd0Qq3Op8WjPtJo8', 1580873021180, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"/images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:IuHimSjabEFmP76skUs3_so0GIaYVz92', 1581300404463, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:MGVc1s9nL_WTz1W0SW5tNU0F_ws8yNva', 1581002199344, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:PMnN3RmLOfB0dWclgf9_rE4ymj-huttr', 1581336148096, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:VTMMYvAlPFrbZgzOL_A0JbybJc9mS0zT', 1581067549134, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:W9zDLpERbNf1pAY9Uk67dwkOZQlKTcYe', 1581610458698, '{\"id\":21,\"username\":\"zhangsan\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":0,\"shopcart\":[{\"Id\":\"3\",\"Quantity\":\"1\"}]}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:_hCB94oxz9Uw1Yf_dsUvDE0P0L0SKNN1', 1581514829472, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/1581428213634.jpg\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:cBzSRsk1Z7dnOw3zUCw1sP3ALd6YbMIZ', 1581774682646, '{\"type\":1,\"id\":21,\"username\":\"zhangsan\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":0,\"shopcart\":[{\"Id\":\"11\",\"Quantity\":\"1\"}]}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:j9H78SP5LjTAKuYNX7FAWz-Fq2fL-kP4', 1581830570072, '{\"type\":2,\"id\":20,\"username\":\"admin\",\"avatar\":\"images/1581428563010.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:l01wBWv5q6L5g90IxJcEPgKBRJL8eUBE', 1581033016156, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:p90I9nIA75Y3RKdzoxWrhpBYFohKde80', 1581126688652, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:zRudZtjaRyHHzMkWSxJCsrvjfPPgxTai', 1581398429557, '{\"id\":20,\"username\":\"admin\",\"avatar\":\"images/default.png\",\"email\":\"111@qqq.com\",\"IsAdmin\":1}');

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '轮播图主键Id',
  `Title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标题',
  `Describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `Picture` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES (1, '30万图书每满100减50', '30万图书每满100减50', 'http://img62.ddimg.cn/upload_img/00087/geq/750x315_lyx_1218-1545638663.jpg', '2019-01-24 21:40:00', '2019-01-24 21:40:00');
INSERT INTO `carousel` VALUES (2, '新书速递', '新书速递', 'http://img62.ddimg.cn/upload_img/00570/tongshu/750x315_lyx_1130-1543806314.jpg', '2019-01-24 21:40:00', '2019-01-24 21:40:00');
INSERT INTO `carousel` VALUES (3, '文艺 100-50', '文艺 100-50', 'http://img61.ddimg.cn/upload_img/00778/a/750x315_wenyi-1545642462.jpg', '2019-01-24 21:40:00', '2019-01-24 21:40:00');
INSERT INTO `carousel` VALUES (4, '你好，这是我们的名片', '你好，这是我们的名片', 'http://img53.ddimg.cn/9003960098707403.jpg', '2019-01-24 21:40:00', '2019-01-24 21:40:00');

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT 0,
  `Content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '内容',
  `PraiseNum` int(11) DEFAULT 0 COMMENT '点赞数',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '编辑时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES (2, 20, '123123333', NULL, '2020-02-11 00:22:21', '2020-02-11 00:23:43');
INSERT INTO `community` VALUES (3, 20, '11111', NULL, '2020-02-11 23:11:22', '2020-02-11 23:11:22');

-- ----------------------------
-- Table structure for community_reponse
-- ----------------------------
DROP TABLE IF EXISTS `community_reponse`;
CREATE TABLE `community_reponse`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CommunityId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '编辑时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '社区服务——回复' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for good_comments
-- ----------------------------
DROP TABLE IF EXISTS `good_comments`;
CREATE TABLE `good_comments`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `UserId` int(11) NOT NULL COMMENT '用户Id',
  `GoodsId` int(11) NOT NULL COMMENT '商品Id',
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '评论内容',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good_comments
-- ----------------------------
INSERT INTO `good_comments` VALUES (1, 21, 7, '123', '2020-02-13 21:28:49', '2020-02-13 21:28:49');
INSERT INTO `good_comments` VALUES (2, 21, 7, '12333332313', '2020-02-13 21:28:56', '2020-02-13 21:28:56');
INSERT INTO `good_comments` VALUES (3, 20, 2, '132', '2020-02-14 00:19:09', '2020-02-14 00:19:09');
INSERT INTO `good_comments` VALUES (4, 20, 2, '132', '2020-02-14 00:29:27', '2020-02-14 00:29:27');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '名称',
  `Photo` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '图片',
  `Type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '类别（1：自营 0：非自营）',
  `Detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '详情',
  `Price` decimal(10, 2) NOT NULL COMMENT '价格',
  `Status` tinyint(1) DEFAULT 3 COMMENT '物品状态（1：上架，2：销售，3：下架）',
  `Num` int(10) DEFAULT 0 COMMENT '物品数量',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '旅行必备物品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (2, '随身物品', 'images/20200206-073959-80.png', 1, '123', 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 21:42:35');
INSERT INTO `goods` VALUES (3, '挎包2', 'images/20200206-074035-50.png', 0, '123', 12.00, 2, 123, '2020-02-06 19:40:35', '2020-02-15 14:24:36');
INSERT INTO `goods` VALUES (4, '随身物品3', 'images/20200206-073959-80.png', 1, NULL, 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:24');
INSERT INTO `goods` VALUES (5, '随身物品4', 'images/20200206-073959-80.png', 1, NULL, 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:25');
INSERT INTO `goods` VALUES (6, '随身物品5', 'images/20200206-073959-80.png', 1, NULL, 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:26');
INSERT INTO `goods` VALUES (7, '随身物品5', 'images/20200206-073959-80.png', 1, NULL, 122.35, 2, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:35');
INSERT INTO `goods` VALUES (8, '随身物品6', 'images/20200206-073959-80.png', 1, NULL, 122.35, 2, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:37');
INSERT INTO `goods` VALUES (10, '随身物品8', 'images/20200206-073959-80.png', 1, NULL, 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:29');
INSERT INTO `goods` VALUES (11, '随身物品9', 'images/20200206-073959-80.png', 1, NULL, 122.35, 1, 100, '2020-02-06 19:39:59', '2020-02-12 22:09:33');

-- ----------------------------
-- Table structure for hotel_room
-- ----------------------------
DROP TABLE IF EXISTS `hotel_room`;
CREATE TABLE `hotel_room`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `HotelId` int(11) NOT NULL COMMENT '酒店Id',
  `RoomCode` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '房间号',
  `Pictures` varchar(600) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '图片数组（限制四张）',
  `BedType` tinyint(1) NOT NULL COMMENT '床型（1：单人床  2：双床）',
  `Price` decimal(10, 2) NOT NULL COMMENT '价格',
  `IsUse` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否使用',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '酒店-房间' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_room
-- ----------------------------
INSERT INTO `hotel_room` VALUES (1, 1, '123', '{\"pictures\":[{\"name\":\"1581351810371.jpg\",\"url\":\"images/1581351810371.jpg\"},{\"name\":\"1581748628456.jpg\",\"url\":\"images/1581748628456.jpg\"}]}', 2, 333.00, 0, '2020-02-10 23:21:30', '2020-02-15 14:37:09');

-- ----------------------------
-- Table structure for hotel_room_comments
-- ----------------------------
DROP TABLE IF EXISTS `hotel_room_comments`;
CREATE TABLE `hotel_room_comments`  (
  `Id` int(11) NOT NULL COMMENT '主键Id',
  `UserId` int(11) NOT NULL COMMENT '用户Id',
  `RoomId` int(11) NOT NULL COMMENT '房间Id',
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '评论内容',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hotel_room_orders
-- ----------------------------
DROP TABLE IF EXISTS `hotel_room_orders`;
CREATE TABLE `hotel_room_orders`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoomId` int(11) DEFAULT NULL COMMENT '房间Id',
  `Name` int(11) DEFAULT NULL COMMENT '姓名',
  `IdCardNumber` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '身份证号',
  `Phone` int(11) DEFAULT NULL COMMENT '电话号码',
  `UserId` int(11) DEFAULT NULL COMMENT '用户Id',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hotels
-- ----------------------------
DROP TABLE IF EXISTS `hotels`;
CREATE TABLE `hotels`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `Name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '酒店名称',
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '地址',
  `Pictures` varchar(600) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '图片数组（限制四张）',
  `HasBreakfast` tinyint(1) DEFAULT 0 COMMENT '是否有早餐',
  `HasWifi` tinyint(1) DEFAULT 0 COMMENT '是否有wifi',
  `Detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '酒店管理表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotels
-- ----------------------------
INSERT INTO `hotels` VALUES (1, '桔子酒店·精选(北京亚运村店)', '北京 朝阳区 北苑路200号安苑东里三区10号院6号楼 【 亚运村/奥体中心地区 】', '{\"pictures\":[{\"name\":\"1581340465208.jpg\",\"url\":\"images/1581340465208.jpg\"},{\"name\":\"1581340465211.jpg\",\"url\":\"images/1581340465211.jpg\"},{\"name\":\"1581748597546.png\",\"url\":\"images/1581748597546.png\"}]}', 1, 0, '服务很周到，特殊时期，挺好的', '2020-02-10 21:08:21', '2020-02-15 14:36:39');

-- ----------------------------
-- Table structure for strategy_info
-- ----------------------------
DROP TABLE IF EXISTS `strategy_info`;
CREATE TABLE `strategy_info`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `Title` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '标题',
  `Pictures` varchar(600) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '图片数组（限制四张）',
  `Content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '内容',
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '地点',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `Address`(`Address`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '攻略信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of strategy_info
-- ----------------------------
INSERT INTO `strategy_info` VALUES (2, '贺记蛋烘糕', '{\"pictures\":[{\"name\":\"1581263371186.jpg\",\"url\":\"images/1581263371186.jpg\"},{\"name\":\"1581314994679.jpg\",\"url\":\"images/1581314994679.jpg\"},{\"name\":\"1581315331660.png\",\"url\":\"images/1581315331660.png\"},{\"name\":\"1581748477946.jpg\",\"url\":\"images/1581748477946.jpg\"}]}', '<p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">店名：贺记蛋烘糕</span></p><p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">地址：成都青羊区文庙西街1号附8号（成都石室中学对面）</span></p><p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">价格：2.5元/个 加三种馅料及以上另算</span></p><p><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);\">这个我亲身去吃过，干净卫生，味道自然也不在话下了</span></p>', '成都青羊区文庙西街1号附8号（成都石室中学对面）', '2020-02-09 23:02:13', '2020-02-15 14:34:45');

-- ----------------------------
-- Table structure for strategy_info_comments
-- ----------------------------
DROP TABLE IF EXISTS `strategy_info_comments`;
CREATE TABLE `strategy_info_comments`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `UserId` int(11) NOT NULL COMMENT '用户Id',
  `StrategyInfoId` int(11) NOT NULL COMMENT '攻略信息Id',
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '评论内容',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of strategy_info_comments
-- ----------------------------
INSERT INTO `strategy_info_comments` VALUES (1, 21, 2, '123', '2020-02-13 21:28:49', '2020-02-14 00:41:29');
INSERT INTO `strategy_info_comments` VALUES (2, 21, 2, '12333332313', '2020-02-13 21:28:56', '2020-02-14 00:41:31');
INSERT INTO `strategy_info_comments` VALUES (3, 20, 2, '132', '2020-02-14 00:19:09', '2020-02-14 00:19:09');
INSERT INTO `strategy_info_comments` VALUES (4, 20, 2, '123', '2020-02-14 00:36:22', '2020-02-14 00:36:22');
INSERT INTO `strategy_info_comments` VALUES (5, 20, 2, '3333', '2020-02-14 00:36:53', '2020-02-14 00:36:53');

-- ----------------------------
-- Table structure for tourist_spots
-- ----------------------------
DROP TABLE IF EXISTS `tourist_spots`;
CREATE TABLE `tourist_spots`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `Name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '景点名称',
  `Pictures` varchar(600) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '图片数组（限制四张）',
  `Detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '描述',
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '地址',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '旅游景点' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tourist_spots
-- ----------------------------
INSERT INTO `tourist_spots` VALUES (2, '三坊七巷', '{\"pictures\":[{\"name\":\"1581433854196.jpg\",\"url\":\"images/1581433854196.jpg\"},{\"name\":\"1581748549244.jpg\",\"url\":\"images/1581748549244.jpg\"}]}', '三坊七巷自晋、唐形成起，便是贵族和士大夫的聚居地，清至民国走向辉煌。区域内现存古民居约有270座，有159处被列入保护建筑。以沈葆桢故居、林觉民故居、严复故居等9处典型建筑为代表的三坊七巷古建筑群，被国务院公布为全国重点文物保护单位。', '福建省福州市', '2020-02-10 16:06:38', '2020-02-15 14:35:50');

-- ----------------------------
-- Table structure for train_tickets
-- ----------------------------
DROP TABLE IF EXISTS `train_tickets`;
CREATE TABLE `train_tickets`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `TrainCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '车次编号',
  `Type` int(1) NOT NULL COMMENT '车次类型：1、G-高铁 2、C-城际 3、Z-直达 4、T-特快 5、K-快速',
  `StartPlace` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '开始地点',
  `EndPlace` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '结束地点',
  `ArriveTime` datetime(0) NOT NULL COMMENT '到达时间',
  `DepartTime` datetime(0) NOT NULL COMMENT '发车时间',
  `SeatDes` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '列车座位详情',
  `StopOverDes` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '经停站详情',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of train_tickets
-- ----------------------------
INSERT INTO `train_tickets` VALUES (5, '123', 1, '莆田', '福州', '2020-02-28 18:22:26', '2020-02-29 23:22:32', '<h4 style=\"text-align:center;color:red;\">座位   -  价格   -  数量 </h4>(1) 座位：硬座、价格：105、数量：2<br/>', '<h4 style=\"text-align:center;color:red;\">地点   -  到达时间   -  发车时间</h4>(1) 地点：厦门、到达时间：2020年02月28日22:04:00、发车时间：2020年02月29日21:45:13<br/>', '2020-02-08 19:23:09', '2020-02-11 23:10:41');
INSERT INTO `train_tickets` VALUES (9, '33', 1, '上海', '四川', '2020-02-08 20:05:39', '2020-02-14 22:05:31', '<h4 style=\"text-align:center;color:red;\">座位   -  价格   -  数量 </h4>(1) 座位：硬座、价格：123、数量：1<br/>', '', '2020-02-08 20:05:49', '2020-02-08 21:28:23');

-- ----------------------------
-- Table structure for train_tickets_orders
-- ----------------------------
DROP TABLE IF EXISTS `train_tickets_orders`;
CREATE TABLE `train_tickets_orders`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `TicketId` int(11) DEFAULT NULL COMMENT '火车票Id',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '乘客名字',
  `Phone` int(11) DEFAULT NULL COMMENT '电话号码',
  `IdCardNumber` int(11) DEFAULT NULL COMMENT '身份证号',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '火车订单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for train_tickets_seats
-- ----------------------------
DROP TABLE IF EXISTS `train_tickets_seats`;
CREATE TABLE `train_tickets_seats`  (
  `TicketId` int(11) NOT NULL COMMENT '车次Id',
  `Type` tinyint(1) NOT NULL COMMENT '类型（0：硬座  1：硬卧 2：软卧 3：高级软卧）',
  `Price` decimal(10, 2) NOT NULL COMMENT '价格',
  `Quantity` int(3) NOT NULL COMMENT '数量',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  INDEX `TicketId`(`TicketId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '车次的座位' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of train_tickets_seats
-- ----------------------------
INSERT INTO `train_tickets_seats` VALUES (9, 0, 123.00, 1, '2020-02-08 21:28:23', '2020-02-08 21:28:23');
INSERT INTO `train_tickets_seats` VALUES (5, 0, 105.00, 2, '2020-02-11 23:10:41', '2020-02-11 23:10:41');

-- ----------------------------
-- Table structure for train_tickets_stopover_station
-- ----------------------------
DROP TABLE IF EXISTS `train_tickets_stopover_station`;
CREATE TABLE `train_tickets_stopover_station`  (
  `TicketId` int(11) NOT NULL COMMENT '火车票Id',
  `Place` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '车站名',
  `ArriveTime` datetime(0) NOT NULL COMMENT '到达时间',
  `DepartTime` datetime(0) NOT NULL COMMENT '发车时间',
  `Sequence` int(2) NOT NULL COMMENT '顺序',
  INDEX `TicketId`(`TicketId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '经停站' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of train_tickets_stopover_station
-- ----------------------------
INSERT INTO `train_tickets_stopover_station` VALUES (33, '南京', '2020-02-09 00:00:00', '2020-02-10 02:07:19', 1);
INSERT INTO `train_tickets_stopover_station` VALUES (5, '厦门', '2020-02-28 22:04:00', '2020-02-29 21:45:13', 1);

-- ----------------------------
-- Table structure for trains
-- ----------------------------
DROP TABLE IF EXISTS `trains`;
CREATE TABLE `trains`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '车次名称',
  `Type` tinyint(1) NOT NULL COMMENT '车型（1：G/C 高铁  2：D动车  3：普通）',
  `StartPlace` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '出发地',
  `EndPlace` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '目的地',
  `DepartDate` datetime(0) DEFAULT NULL COMMENT '出发日期',
  `ReturnDate` datetime(0) DEFAULT NULL COMMENT '返回日期',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '火车票预订' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `Id` int(200) NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `Password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '8b430f20f8641d94f71fdda086d02660' COMMENT '密码',
  `Avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '/images/default.png' COMMENT '用户图像',
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `IsAdmin` int(1) DEFAULT 0 COMMENT '是否为管理员',
  `CreateTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `UpdateTime` datetime(0) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (20, 'admin', '8b430f20f8641d94f71fdda086d02660', 'images/1581428563010.png', '111@qqq.com', 1, '2020-02-11 22:29:43', NULL);
INSERT INTO `users` VALUES (21, 'zhangsan', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '111@qqq.com', 0, '2020-02-12 23:21:00', NULL);
INSERT INTO `users` VALUES (22, 'admin12', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '123@qq.com', 0, '2020-02-06 11:09:08', NULL);
INSERT INTO `users` VALUES (23, '123', '8b430f20f8641d94f71fdda086d02660', 'images/20200206-051909-710.png', '123@qq.com', 0, '2020-02-06 17:19:09', NULL);
INSERT INTO `users` VALUES (24, '12333', '8b430f20f8641d94f71fdda086d02660', 'images/20200206-064832-730.png', '1233@qq.com', 0, '2020-02-06 18:48:32', NULL);
INSERT INTO `users` VALUES (25, '122', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-06 17:19:43', NULL);
INSERT INTO `users` VALUES (26, '333', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-06 17:19:48', NULL);
INSERT INTO `users` VALUES (27, '4444', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-06 17:19:52', NULL);
INSERT INTO `users` VALUES (28, '1231', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-06 17:20:07', NULL);
INSERT INTO `users` VALUES (29, '4441', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-06 17:20:14', NULL);
INSERT INTO `users` VALUES (30, '啊11', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '11@qqq.com', 0, '2020-02-12 21:25:53', NULL);
INSERT INTO `users` VALUES (31, 'linb16', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '123@qq.com', 1, '2020-02-08 10:29:41', NULL);
INSERT INTO `users` VALUES (32, 'qwe123', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', 'qw@qq.com', 1, '2020-02-09 10:47:48', NULL);
INSERT INTO `users` VALUES (33, 'a123', '8b430f20f8641d94f71fdda086d02660', 'images/default.png', '123@qq.om', 1, '2020-02-12 21:17:17', NULL);
INSERT INTO `users` VALUES (34, 'linliqi123', '8b430f20f8641d94f71fdda086d02660', 'images/20200215-135250-200.png', '123@qq.com', 0, '2020-02-15 13:53:04', NULL);

-- ----------------------------
-- Table structure for users_address
-- ----------------------------
DROP TABLE IF EXISTS `users_address`;
CREATE TABLE `users_address`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL COMMENT '用户表的Id',
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '姓名',
  `Phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地址',
  `IsDefault` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '是否默认的收获地址',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_address
-- ----------------------------
INSERT INTO `users_address` VALUES (13, 21, 'tjise.gaobaiwu.top', '555', '123', '1');

SET FOREIGN_KEY_CHECKS = 1;
