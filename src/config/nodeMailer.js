const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_NODEMAIL, CLAVE_APP_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//Ponemos gmail.com porque usamos un gmail para mandar los correos
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_NODEMAIL, // colocamos el correo de donde se van a mandar los email
      pass: CLAVE_APP_EMAIL, // la clave de acceso que genermos para el correo 
    },
    tls: {
      rejectUnauthorized: false
  }
  });

transporter.verify().then(()=> {
    console.log("ready to send emails");
})


module.exports = {transporter};