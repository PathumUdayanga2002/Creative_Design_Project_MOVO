const express = require("express");
const multer = require("multer");
const path = require("path"); // Add path module
const fs = require("fs"); // Add fs module for file deletion
const { verifyAdmin } = require("../middleware/auth");
const File = require("../models/file");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Admin Upload Route
router.post("/upload", verifyAdmin, upload.single("file"), async (req, res) => {
  try {
    const file = new File({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      type: req.body.type,
      uploadedBy: "admin",
    });

    await file.save();
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Get All Files Route (User View)
router.get("/", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// Route to delete a file by its ID
router.delete("/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Construct the file path
    const filePath = path.join(
      __dirname,
      "../uploads",
      file.url.replace("/uploads/", "")
    );

    // Delete the file from the server
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file from server:", err);
        return res
          .status(500)
          .json({ error: "Error deleting file from server" });
      }

      // Delete the file entry from the database
      try {
        await File.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "File deleted successfully" });
      } catch (dbError) {
        console.error("Error deleting file from database:", dbError);
        res.status(500).json({ error: "Error deleting file from database" });
      }
    });
  } catch (error) {
    console.error("Error during file deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
