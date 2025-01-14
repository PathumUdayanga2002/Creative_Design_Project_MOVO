let countdown = {
  time: 0,
  isRunning: false,
};
let timerInterval = null;

const startCountdown = (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  if (!countdown.isRunning) {
    countdown.isRunning = true;
    io.emit("updateCountdown", countdown); // Notify clients
    timerInterval = setInterval(() => {
      if (countdown.time > 0) {
        countdown.time -= 1;
        io.emit("updateCountdown", countdown);
      } else {
        clearInterval(timerInterval);
        countdown.isRunning = false;
        io.emit("updateCountdown", countdown); // Final update
      }
    }, 1000);
    res.status(200).send({ message: "Countdown started" });
  } else {
    res.status(400).send({ message: "Countdown is already running" });
  }
};

const stopCountdown = (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  if (countdown.isRunning) {
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify clients
    res.status(200).send({ message: "Countdown stopped" });
  } else {
    res.status(400).send({ message: "Countdown is not running" });
  }
};

const setCountdown = (req, res) => {
  const io = req.io; // Access Socket.IO from the request object
  const { time } = req.body;
  if (typeof time === "number" && time >= 0) {
    countdown.time = time;
    countdown.isRunning = false;
    clearInterval(timerInterval);
    io.emit("updateCountdown", countdown); // Notify clients
    res.status(200).send({ message: "Countdown time set" });
  } else {
    res.status(400).send({ message: "Invalid time value" });
  }
};

// const getCountdown = (req, res) => {
//   res.status(200).send(countdown);
//   console.log(countdown);
// };
const getCountdown = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send the initial countdown state
  res.write(`data: ${JSON.stringify(countdown)}\n\n`);

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify(countdown)}\n\n`);
  }, 1000); // Update every second

  // Cleanup when the client disconnects
  req.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected from real-time countdown updates");
  });
};


module.exports = { startCountdown, stopCountdown, setCountdown, getCountdown };
