const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const { password, gmail } = require("../../config");
const fs = require("fs");
const { urlClient } = require("../../config");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false, // Use `true` for port 465, `false` for all other ports
  requireTLS: true,
  auth: {
    user: gmail,
    pass: password,
  },
});
//aera dkus rtkd glf
const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");
    let message = {
      from: gmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
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
      from: "GedungCangkol@gmail.com",
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
    };
    return await transporter.sendMail(message);
  } catch (ex) {}
};
module.exports = { otpMail, forgotPass };
