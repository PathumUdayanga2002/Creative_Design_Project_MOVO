const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/admin-dashboard", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome to admin dashboard....!" });
});

module.exports = router;
