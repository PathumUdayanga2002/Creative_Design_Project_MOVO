let countdown = {
    time: 0,
    isRunning: false,
  };
  
  const startCountdown = (req, res) => {
    countdown.isRunning = true;
    res.status(200).send({ message: "Countdown started" });
  };
  
  const stopCountdown = (req, res) => {
    countdown.isRunning = false;
    res.status(200).send({ message: "Countdown stopped" });
  };
  
  const setCountdown = (req, res) => {
    const { time } = req.body;
    if (typeof time === "number" && time >= 0) {
      countdown.time = time;
      res.status(200).send({ message: "Countdown time set" });
    } else {
      res.status(400).send({ message: "Invalid time value" });
    }
  };
  
  const getCountdown = (req, res) => {
    res.status(200).send(countdown);
  };
  
  module.exports = { startCountdown, stopCountdown, setCountdown, getCountdown };
  