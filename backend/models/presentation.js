const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
  isGroup: { type: Boolean, required: true },
  groupMembers: [
    {
      id: String,
      name: String,
    },
  ],
  description: { type: String },
  file: { type: String },
});

module.exports = mongoose.model("presentation", presentationSchema);
