// server.js (same directory as transcription.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Import transcription service
const { upload, transcribeAudio } = require("./utils/transcription");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const presenterRoutes = require("./routes/presenterRoutes");
const googleCalendarRoutes = require("./routes/googleCalenderRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/presenter", presenterRoutes);
app.use("/api/google", googleCalendarRoutes);

// MongoDB connection
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.error(err.message));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Transcription endpoint
app.post("/api/transcribe", upload.single("audio"), transcribeAudio);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
