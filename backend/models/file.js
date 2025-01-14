const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true }, // "document" or "video"
  uploadedBy: { type: String, required: true }, // E.g., "admin"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("file", fileSchema);
