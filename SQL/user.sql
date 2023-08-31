-- creating table users
CREATE TABLE users(
    author_id INT NOT NULL AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (author_id)
);


-- adding records to users table
INSERT INTO 
    users(author_name, avatar_url)
VALUES('Tanmay Chavan', 'https://i.imgur.com/hWNbOCZ.jpg');

INSERT INTO 
    users(author_name, avatar_url)
VALUES('Hoshino Ruby', 'https://i.imgur.com/rGrS338.jpg');

INSERT INTO 
    users(author_name, avatar_url)
VALUES('Kiyotaka Ayanokoji', 'https://i.imgur.com/cbT3ASB.jpg');

INSERT INTO 
    users(author_name, avatar_url)
VALUES('Takemoto Uruka', 'https://i.imgur.com/F9fqQZb.png');




Create table If Not Exists Employee (employee_id int, department_id int, primary_flag ENUM('Y','N'));
Truncate table Employee;
insert into Employee (employee_id, department_id, primary_flag) values ('1', '1', 'N');
insert into Employee (employee_id, department_id, primary_flag) values ('1', '2', 'N');
insert into Employee (employee_id, department_id, primary_flag) values ('2', '1', 'Y');
insert into Employee (employee_id, department_id, primary_flag) values ('2', '2', 'N');
insert into Employee (employee_id, department_id, primary_flag) values ('3', '3', 'N');
insert into Employee (employee_id, department_id, primary_flag) values ('4', '2', 'N');
insert into Employee (employee_id, department_id, primary_flag) values ('4', '3', 'Y');
insert into Employee (employee_id, department_id, primary_flag) values ('4', '4', 'N');