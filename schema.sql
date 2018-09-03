CREATE DATABASE my_movies_db;
USE my_movies_db;

CREATE TABLE movies(
	id int NOT NULL AUTO_INCREMENT,
	movie varchar(255) NOT NULL,
	PRIMARY KEY (id)
	);
	
	INSERT INTO movies (movie) VALUES ('Rush Hour 2');