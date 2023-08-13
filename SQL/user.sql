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