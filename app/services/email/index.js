const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const {SmtpPassword, SmtpUsergmail,SmtpPort,SmtpHost,urlClient } = require("../../config");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: SmtpHost,
  port: SmtpPort,
  secure: SmtpPort == 465,
  auth: {
    user: SmtpUsergmail,
    pass: SmtpPassword,
  },
});

//aera dkus rtkd glf
const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");
    let message = {
      from: SmtpUsergmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@gedungcangkol.com>'
      }
    };

    return await transporter.sendMail(message);
  } catch (ex) {}
};

const forgotPass = async (email, token) => {
  try {
    const resEmail = `&email=${email}`
    const data = { token, urlClient, resEmail };
    let template = fs.readFileSync("app/views/email/forgot.html", "utf8");

    let message = {
      from: SmtpUsergmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
    };
    return await transporter.sendMail(message);
  } catch (ex) {}
};
module.exports = { otpMail, forgotPass };
