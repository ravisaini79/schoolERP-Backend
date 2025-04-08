const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  requireTLS: true,
  service: "gmail",
  auth: {
    user: 'rssaini7976@gmail.com',
    pass: 'kmca yhwp hiut muey',
  },
});

module.exports = transporter;
