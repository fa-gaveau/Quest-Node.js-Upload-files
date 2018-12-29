const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const MailDev = require('maildev');

const maildev = new MailDev();

// Création de la méthode de transport de l'email

maildev.listen();

// Handle new emails as they come in
maildev.on('new', email => {
  console.log(`Received new email with subject: ${email.subject}`);
});

// Get all emails
maildev.getAllEmail((err, emails) => {
  if (err) return console.log(err);
  console.log(`There are ${emails.length} emails`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const transport = nodemailer.createTransport({
    port: 1025,
    ignoreTLS: true
  });

  transport.sendMail(
    {
      from: 'Deer Wild <deer@wild.com>', // Expediteur
      to: 'supergrandma@yopmail.com', // Destinataires
      subject: 'File moi ta recette', // Sujet
      text: 'Ca vient, merci!', // plaintext body
      html: '<b>Ca vient, merci!</b>' // html body
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + response.message);
      }
    }
  );
});

module.exports = router;
