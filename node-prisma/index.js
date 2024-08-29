const express = require('express');
const prisma = require('./prisma/index');

const app = express();

app.use(express.json());
app.post('/', async (req, res) => {
  try {
    const { email, todo } = req.body;
    console.log(req.body);
    await prisma.user.create({
      data: {
        email,
        todo,
      },
    });

    return res.status(200).send({ message: 'Created successfully...' });
  } catch (er) {
    return res.status(400).send({ message: er.message });
  }
});

app.get('/', async (req, res) => {
  try {
    let data = await prisma.user.findMany({});
    return res.status(200).send({ data });
  } catch (er) {
    return res.status(200).send({ message: er.message });
  }
});

app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
