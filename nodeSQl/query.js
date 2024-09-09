const querys = {
  checkIfUserExists: `SHOW TABLES LIKE 'Users';`,
  checkIfTodosExists: `SHOW TABLES LIKE 'Todos';`,
  createUserTable: `CREATE TABLE Users (  
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE);`,
  createTodoTable: `CREATE TABLE Posts (  
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  content TEXT,
  author_id INT,  
  FOREIGN KEY (author_id) REFERENCES Users(id));`,
  insertUser: `INSERT INTO Users (username, email) VALUES (?,?);`,
  insertTodo: `INSERT INTO Todos (title, content, author_id) VALUES (?,?, ?);`,
};

module.exports = { querys };
