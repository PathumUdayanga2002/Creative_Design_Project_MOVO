const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Setting up multer for file uploads
const upload = multer({ dest: "uploads/" });

// AssemblyAI API Key from environment variables
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Define routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const presenterRoutes = require("./routes/presenterRoutes");
const countdownRoutes = require("./routes/countdownRoutes");
const fileRoutes = require("./routes/fileRoutes");
const emailRoutes = require("./routes/emailRoutes");
const uploadDetailsRoutes = require("./routes/uploadDetailsRoutes");

app.use("/api/set-countdown", countdownRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/presenter", presenterRoutes);
app.use("/api/files", fileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/email", emailRoutes);
app.use("/api/upload-details", uploadDetailsRoutes);

// Route to handle audio uploads and transcription with AssemblyAI
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileStream = fs.createReadStream(filePath);

    // Upload the audio file to AssemblyAI
    const uploadResponse = await axios.post("https://api.assemblyai.com/v2/upload", fileStream, {
      headers: {
        "authorization": ASSEMBLYAI_API_KEY,
        "transfer-encoding": "chunked",
      },
    });

    const audioUrl = uploadResponse.data.upload_url;

    // Request transcription from AssemblyAI
    const transcriptResponse = await axios.post("https://api.assemblyai.com/v2/transcript", {
      audio_url: audioUrl,
    }, {
      headers: {
        "authorization": ASSEMBLYAI_API_KEY,
      },
    });

    const transcriptId = transcriptResponse.data.id;
    let transcriptStatus;
    let transcriptResult;

    // Polling the transcription result
    do {
      const pollingResponse = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          "authorization": ASSEMBLYAI_API_KEY,
        },
      });

      transcriptStatus = pollingResponse.data.status;

      if (transcriptStatus === 'completed') {
        transcriptResult = pollingResponse.data.text;
      } else if (transcriptStatus === 'failed') {
        throw new Error("Transcription failed");
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (transcriptStatus !== 'completed');

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Send the transcription result to the client
    res.json({ transcript: transcriptResult });
  } catch (error) {
    console.error("Error during transcription:", error);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

// Socket.IO server setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

let countdown = {
  time: 0,
  isRunning: false,
};
let timerInterval = null;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("updateCountdown", countdown);

  socket.on("startCountdown", () => {
    if (!countdown.isRunning) {
      countdown.isRunning = true;
      io.emit("updateCountdown", countdown);
      timerInterval = setInterval(() => {
        if (countdown.time > 0) {
          countdown.time -= 1;
          io.emit("updateCountdown", countdown);
        } else {
          clearInterval(timerInterval);
          countdown.isRunning = false;
          io.emit("updateCountdown", countdown);
        }
      }, 1000);
    }
  });

  socket.on("stopCountdown", () => {
    if (countdown.isRunning) {
      countdown.isRunning = false;
      clearInterval(timerInterval);
      io.emit("updateCountdown", countdown);
    }
  });

  socket.on("setCountdown", (newTime) => {
    countdown.time = newTime;
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// MongoDB connection setup
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.log(err.message));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Server listener
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
