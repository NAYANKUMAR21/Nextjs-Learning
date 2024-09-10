-- Below is the command used to run the entire query in a batch
--  mysql -u your_username -p'your_password' -D your_database < query.sql
SELECT * FROM 'ABC';

SHOW TABLES LIKE 'Users';
SHOW TABLES LIKE 'Todos';


CREATE TABLE Users (  
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255)  UNIQUE, 
  email VARCHAR(255) UNIQUE
);

CREATE TABLE Todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT,  
  FOREIGN KEY (author_id) REFERENCES Users(id)  
);

INSERT INTO Users (username, email) VALUES ('Nayan Kumar', 'nayan@gmail.com');
INSERT INTO Todos (title, content, author_id) VALUES ('My First Todo', 'Hello World!', LAST_INSERT_ID());