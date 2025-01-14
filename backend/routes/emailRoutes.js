const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import your User model
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer();

router.get("/search-user", async (req, res) => {
  try {
    const { id } = req.query; // Retrieve `id` from query parameters
    console.log("Received ID:", id); // Log the received ID

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    // Find the user by ID

    const user = await User.find({ id: new RegExp(`^${id}$`, "i") });

    if (user.length === 0) {
      console.log("User not found in database for ID:", id);
      return res.status(404).json({ message: "User not found" });
    }

    //console.log("User found:", user);

    // Extract user details (assuming the user is in the first item of the array)
    const { id: userId, name, email, role } = user[0]._doc; // Access the first user in the array
    res.status(200).json({ id: userId, name, email, role });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Server error" });
    console.log(error.message);
  }
});

// Send Email to the Selected User
router.post("/send-email", upload.single("attachment"), async (req, res) => {
  const { subject, message } = req.body;
  const email = req.body.email; // Email is passed in the form-data
  const attachment = req.file; // The uploaded file, if any

  try {
    if (!email) {
      return res.status(400).json({ message: "Recipient email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // App password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
      attachments: attachment
        ? [
            {
              filename: attachment.originalname,
              content: attachment.buffer,
            },
          ]
        : [],
    };

    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

module.exports = router;
