const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const presenterRoutes = require("./routes/presenterRoutes");
const countdownRoutes = require("./routes/countdownRoutes");

app.use("/api/set-countdown", countdownRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/presenter", presenterRoutes);

const URL = process.env.MONGODB_URL;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend requests from your Vite app
    methods: ["GET", "POST", "PATCH"],
  },
});

// Middleware to attach Socket.IO instance to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Timer state
let countdown = {
  time: 0, // Time in seconds
  isRunning: false,
};
let timerInterval = null;

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send initial countdown data to the connected client
  socket.emit("updateCountdown", countdown);

  // Handle starting the countdown
  socket.on("startCountdown", () => {
    if (!countdown.isRunning) {
      countdown.isRunning = true;
      io.emit("updateCountdown", countdown); // Notify all clients
      timerInterval = setInterval(() => {
        if (countdown.time > 0) {
          countdown.time -= 1;
          io.emit("updateCountdown", countdown); // Broadcast updated time
        } else {
          clearInterval(timerInterval);
          countdown.isRunning = false;
          io.emit("updateCountdown", countdown); // Notify all clients
        }
      }, 1000);
    }
  });

  // Handle stopping the countdown
  socket.on("stopCountdown", () => {
    if (countdown.isRunning) {
      countdown.isRunning = false;
      clearInterval(timerInterval);
      io.emit("updateCountdown", countdown); // Notify all clients
    }
  });

  // Handle setting the countdown time
  socket.on("setCountdown", (newTime) => {
    countdown.time = newTime;
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// MongoDB connection
mongoose
  .connect(URL, {
    useNewUrlParser: true, // Correct spelling
    useUnifiedTopology: true, // Correct spelling
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((err) => console.log(err.message));

// Create connection
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Create app listener
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
