//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

'use strict';
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.mailFrom,
    pass: process.env.mailPsw
  }
});

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let remetente = '"no" reply <no-reply@ongbook.org>';

    let assunto = req.body['assunto'];
    let destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
    let corpo = req.body['corpo'];
    let corpoHtml = req.body['corpo_html'];

    let email = {
      from: remetente,
      to: destinatarios,
      subject: assunto,
      text: corpo,
      html: corpoHtml
    };

    transporter.sendMail(email, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Mensagem %s enviada: %s', info.messageId, info.response, ' Para: ', email.to);
    });

    res.end();

  });
});