const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "bulk.smtp.mailtrap.io",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "api",

    pass: "64cb6b95027e14dccae7a579b7ba142b",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "hello@demomailtrap.co", // sender address
    to: "nigaratiya786@gmail.com", // list of receivers
    subject: "order info", // Subject line
    text: "Here is your order details ", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

async function sendEmail() {
  console.log("sending email", transporter);
  await main();
}

module.exports = { sendEmail };
