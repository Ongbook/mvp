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
  cors(req, res, async () => {
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

    try {
      const info = await transporter.sendMail(email);
      console.log('Mensagem %s enviada: %s', info.messageId, info.response, ' Para: ', email.to);
      res.status(200).send({ status: 'Email sent', info: info });
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).send({ status: 'Error', error: error.message });
    }
  });
});
