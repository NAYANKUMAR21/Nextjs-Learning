const { MailtrapClient } = require('mailtrap');

const TOKEN = 'c1522f5d104048c7a35f1fc71bf2d7f3';
const ENDPOINT = 'https://bulk.api.mailtrap.io/';

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: 'mailtrap@gmail.com',
  name: 'Mailtrap Test',
};
const recipients = [
  {
    email: 'naayaankumar@gmail.com',
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: 'You are awesome!',
    text: 'Congrats for sending test email with Mailtrap!',
    category: 'Integration Test',
  })
  .then(console.log, console.error);
