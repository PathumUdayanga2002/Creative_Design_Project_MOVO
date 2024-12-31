const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/presenter-dashboard",
  authenticate,
  authorize("presenter"),
  (req, res) => {
    res.json({ message: "Welcome to presenter dashboard....!" });
  }
);
module.exports = router;
