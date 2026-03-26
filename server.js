const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("portfolio"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/portfolio/index.html");
});

// Send email route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("DATA:", req.body);

  try {
 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
      await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.send("✅ Message Sent!");
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).send("❌ Error sending message");
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});