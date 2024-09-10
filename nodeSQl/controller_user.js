const db = require('./dbConfig/config');
const { querys } = require('./query');

const checkisUserExists = (req, res) => {
  const { username, email } = req.body;

  try {
    db.query(querys.insertUser, [username, email], (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message, success: false });
      }
      return res
        .status(201)
        .send({ message: 'User created successfully', success: true, result });
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const addTodo = (req, res) => {
  const { title, content } = req.body;
  const authorId = req.TokenId;
  try {
    db.query(querys.insertTodo, [title, content, authorId], (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message, success: false });
      }
      return res
        .status(201)
        .send({ message: 'Todo created successfully', success: true, result });
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const UserTodos = (req, res) => {
  const { id } = req.params;
  try {
    db.query('Select * from Todos where author_id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message, success: false });
      }
      return res
        .status(201)
        .send({ message: 'Todo created successfully', success: true, result });
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

module.exports = { checkisUserExists, addTodo, UserTodos };
