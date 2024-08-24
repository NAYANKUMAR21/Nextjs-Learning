const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

const transporter = nodemailer.createTransport({
  host: 'bulk.smtp.mailtrap.io',
  port: 587,
  secure: false,

  auth: {
    user: 'api',
    pass: 'c1522f5d104048c7a35f1fc71bf2d7f3',
  },
});

app.get('/', async (req, res) => {
  const mailOptions = {
    from: 'naayaankumar@gmail.com',
    to: [
      'naayaankumar@gmail.com',
      'battledown1@gmail.com',
      'nayanph1@gmail.com',
      'nidhish.agarwal@kalvium.community',
    ],
    subject: `Trail check`,
    html: `<h1>Checking if mail can be sent.....</h1>`,
  };
  try {
    let x = await transporter.sendMail(mailOptions);
    console.log(x);
    return res.status(200).send({ message: 'Email has been sent ', x });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.listen(8080, () => {
  console.log('Service running on  http://localhost:8080');
});
