create database nodejs;
use nodejs;
	
create table users (
	id INT not null AUTO_INCREMENT ,
	name VARCHAR(50) not null,
	email VARCHAR(50) not null,
    PRIMARY KEY (iD)
);
insert into users (id, name, email) values
('1', 'Matthias', 'mlaurenson0@dailymotion.com'),
('2', 'Cele', 'cmcgillicuddy1@soup.io'),
('3', 'Janela', 'jkreuzer2@icq.com'),
( '4','Ferguson', 'fmorris3@reuters.com'),
( '5','Sheri', 'sscartifield4@squarespace.com');


select * from users
