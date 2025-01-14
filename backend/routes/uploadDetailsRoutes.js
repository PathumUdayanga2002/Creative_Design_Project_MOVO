const express = require("express");
const multer = require("multer");
const router = express.Router();
const Presentation = require("../models/presentation");
const fs = require("fs");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload Presentation
router.post("/upload-presentation", upload.single("file"), async (req, res) => {
  try {
    // Extract and validate request body
    const { isGroup, groupMembers, description } = req.body;

    // Parse groupMembers only if isGroup is true
    const parsedGroupMembers =
      isGroup === "true" ? JSON.parse(groupMembers || "[]") : [];

    // Ensure required fields are present
    if (!description || !req.file) {
      return res
        .status(400)
        .json({ message: "File and description are required!" });
    }

    // Create and save the presentation document
    const presentation = new Presentation({
      isGroup: isGroup === "true", // Convert to boolean
      groupMembers: parsedGroupMembers,
      description,
      file: req.file.filename,
    });

    await presentation.save();
    res.status(200).json({ message: "Presentation uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading presentation:", error);
    res.status(500).json({ message: "Failed to upload presentation", error });
  }
});

// router.get("/search-presentation", async (req, res) => {
//   const { id } = req.query;

//   try {
//     const presentation = await Presentation.findOne({ "groupMembers.id": id });
//     if (!presentation) {
//       return res.status(404).json({ message: "Presentation not found" });
//     }
//     res.status(200).json(presentation);
//   } catch (error) {
//     console.error("Error searching presentation:", error);
//     res.status(500).json({ message: "Error occurred", error });
//   }
// });
router.get("/search-presentation", async (req, res) => {
  const { id } = req.query;

  try {
    const presentation = await Presentation.findOne({ "groupMembers.id": id });
    if (!presentation) {
      return res.status(404).json({ message: "Presentation not found" });
    }
    res.status(200).json(presentation);
  } catch (error) {
    console.error("Error searching presentation:", error);
    res.status(500).json({ message: "Error occurred", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const presentations = await Presentation.find();
    res.status(200).json(presentations);
  } catch (error) {
    console.error("Error fetching presentations:", error);
    res.status(500).json({ message: "Error occurred", error });
  }
});

router.delete("/delete-details/:id", (req, res) => {
  const { id } = req.params;

  // Find the presentation by ID
  const presentationIndex = presentations.findIndex((p) => p.id === id);

  if (presentationIndex === -1) {
    return res.status(404).json({ error: "Presentation not found" });
  }

  const presentation = presentations[presentationIndex];

  // Remove the file from the server
  const filePath = path.join(__dirname, "uploads", presentation.file); // Adjust 'uploads' path as needed
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error deleting file:", err);
      return res.status(500).json({ error: "Failed to delete file" });
    }

    // Remove the presentation from the database
    presentations.splice(presentationIndex, 1);

    res.status(200).json({ message: "Presentation deleted successfully" });
  });
});
module.exports = router;
