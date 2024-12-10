const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend's running URL
    methods: ["GET", "POST"],
  },
});

// Timer variables
let timeLeft = 0;
let timerInterval = null;

// Start Timer
const startTimer = () => {
  if (timerInterval) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      io.emit("timerUpdate", timeLeft);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      io.emit("timerStopped");
    }
  }, 1000);
};

// Stop Timer
const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  io.emit("timerStopped");
};

// Reset Timer
const resetTimer = () => {
  timeLeft = 0;
  stopTimer();
  io.emit("timerUpdate", timeLeft);
};

// Adjust Timer
const adjustTimer = (newDuration) => {
  timeLeft = newDuration;
  io.emit("timerUpdate", timeLeft);
};

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send current timer state
  socket.emit("timerUpdate", timeLeft);

  // Listen for timer control events
  socket.on("startTimer", startTimer);
  socket.on("stopTimer", stopTimer);
  socket.on("resetTimer", resetTimer);
  socket.on("adjustTimer", adjustTimer);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
