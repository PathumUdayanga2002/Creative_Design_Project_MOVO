const express = require("express");
const {
  getAuthUrl,
  setCredentials,
  createEvent,
} = require("../utils/googleCalender");
const router = express.Router();

router.get("/auth-url", (req, res) => {
  const url = getAuthUrl();
  res.json({ url });
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    setCredentials(tokens);

    res.json({ message: "Google Calendar integration successful!" });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

router.post("/schedule-event", async (req, res) => {
  try {
    const { summary, description, start, end } = req.body;

    const event = await createEvent({ summary, description, start, end });
    res.json({ message: "Event scheduled successfully", event });
  } catch (error) {
    console.error("Error scheduling event:", error);
    res.status(500).json({ error: "Failed to schedule event" });
  }
});

module.exports = router;
