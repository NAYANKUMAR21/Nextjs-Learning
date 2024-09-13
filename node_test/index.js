const express = require('express');
const prisma = require('./prisma');
const app = express();

app.get('/', async (req, res) => {
  let data = await prisma.user.findMany({});

  res.status(200).send({
    message: 'data fetch successfully...',
    data,
    success: true,
  });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
