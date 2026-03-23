CREATE TABLE `training_enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`refNumber` varchar(10) NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`course` varchar(200),
	`plan` varchar(100),
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_enquiries_id` PRIMARY KEY(`id`)
);
