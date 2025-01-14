// controllers/userController.js
const User = require("../models/user");

// Search Users by ID
exports.searchUsersById = async (req, res) => {
  const { query } = req.query;

  try {
    // Search for users with IDs matching the query (case-insensitive)
    const users = await User.find({ id: { $regex: query, $options: "i" } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Failed to search users", error });
  }
};
