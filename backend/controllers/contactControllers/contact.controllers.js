// controllers/contactController.js
const Contact = require("../../models/contact.model");
const nodemailer = require("nodemailer");

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ✅ 1. Save to DB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // ✅ 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = submitContact;