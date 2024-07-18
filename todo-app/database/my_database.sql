-- CREATE DATABASE UserDatabase;
USE UserDatabase;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int AUTO_INCREMENT NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
);
CREATE TABLE IF NOT EXISTS `todo` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` TEXT,
  `status` varchar(20) NOT NULL,
  `due_date` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES `login` (id)
);