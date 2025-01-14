const express = require("express");
const router = express.Router();
const {
  startCountdown,
  stopCountdown,
  setCountdown,
  getCountdown,
} = require("../controllers/countdownController");

router.get("/get-countdown", getCountdown);
router.post("/countdown", setCountdown);
router.patch("/countdown/start", startCountdown);
router.patch("/countdown/stop", stopCountdown);

module.exports = router;
