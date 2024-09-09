const express = require('express');
const db = require('./dbConfig/config');
const app = express();
const { query } = require('./query');
const { checkisUserExists, addTodo, UserTodos } = require('./controller_user');
const TokenMiddleware = require('./middleware');

app.use(express.json());

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM Items';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.json(results);
  });
});

app.post('/signup', checkisUserExists);
app.post('/add-Todo', TokenMiddleware, addTodo);

app.get('/:id', TokenMiddleware, UserTodos);

app.patch('/:id');
app.delete('/:id');

app.listen(8080, () => {
  console.log(`backend running on port 8080`);
});
