










































-- -----------------------------------------------------------
-- Entity Designer DDL Script for MySQL Server 4.1 and higher
-- -----------------------------------------------------------
-- Date Created: 07/06/2016 15:03:24

-- Generated from EDMX file: C:\Users\Alek\Documents\workspace\Calender\Models\GGMysql.edmx
-- Target version: 3.0.0.0

-- --------------------------------------------------



-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- NOTE: if the constraint does not exist, an ignorable error will be reported.
-- --------------------------------------------------


--    ALTER TABLE `userlogin` DROP CONSTRAINT `FK_USERID`;

--    ALTER TABLE `userprofile` DROP CONSTRAINT `FK_USERPROFILEUSERID`;


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------
SET foreign_key_checks = 0;

    DROP TABLE IF EXISTS `user`;

    DROP TABLE IF EXISTS `userlogin`;

    DROP TABLE IF EXISTS `userprofile`;

SET foreign_key_checks = 1;

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------


CREATE TABLE `user`(
	`iduser` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`username` varchar (255) NOT NULL, 
	`firstname` varchar (100) NOT NULL, 
	`lastname` varchar (100) NOT NULL, 
	`email` varchar (45), 
	`password` varchar (512) NOT NULL, 
	`org_id` int, 
	`createdby` int NOT NULL);

ALTER TABLE `user` ADD PRIMARY KEY (`iduser`);





CREATE TABLE `userlogin`(
	`iduserlogin` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`userid` int NOT NULL, 
	`encryptkey` varchar (512), 
	`encryptvalue` varchar (512), 
	`create_time` datetime, 
	`cookie` varchar (512), 
	`form` varchar (512), 
	`userIp` varchar (45));

ALTER TABLE `userlogin` ADD PRIMARY KEY (`iduserlogin`);





CREATE TABLE `userprofile`(
	`iduserprofile` int NOT NULL, 
	`userid` int, 
	`address1` varchar (200), 
	`address2` varchar (200), 
	`city` varchar (45), 
	`state` varchar (45), 
	`country` varchar (45), 
	`zipcode` varchar (45), 
	`cellphone` varchar (45), 
	`homephone` varchar (45), 
	`workphone` varchar (45), 
	`gender` TINYINT UNSIGNED NOT NULL, 
	`dob` time NOT NULL);

ALTER TABLE `userprofile` ADD PRIMARY KEY (`iduserprofile`);







-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------


-- Creating foreign key on `userid` in table 'userlogin'

ALTER TABLE `userlogin`
ADD CONSTRAINT `FK_USERID`
    FOREIGN KEY (`userid`)
    REFERENCES `user`
        (`iduser`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;


-- Creating non-clustered index for FOREIGN KEY 'FK_USERID'

CREATE INDEX `IX_FK_USERID`
    ON `userlogin`
    (`userid`);



-- Creating foreign key on `userid` in table 'userprofile'

ALTER TABLE `userprofile`
ADD CONSTRAINT `FK_USERPROFILEUSERID`
    FOREIGN KEY (`userid`)
    REFERENCES `user`
        (`iduser`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;


-- Creating non-clustered index for FOREIGN KEY 'FK_USERPROFILEUSERID'

CREATE INDEX `IX_FK_USERPROFILEUSERID`
    ON `userprofile`
    (`userid`);



-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
