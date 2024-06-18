import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendConfirmationEmail(email: string): void {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Confirmation",
    text: "Please confirm your email by clicking the following link.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
