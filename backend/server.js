const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

// Load AssemblyAI API key from environment variables
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

if (!ASSEMBLYAI_API_KEY) {
  console.error('Error: Missing ASSEMBLYAI_API_KEY. Ensure it is set in your .env file.');
  process.exit(1);
}

// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  try {
    // Step 1: Upload the audio file to AssemblyAI
    const audioFile = fs.createReadStream(filePath);
    const uploadResponse = await axios.post(
      'https://api.assemblyai.com/v2/upload',
      audioFile,
      {
        headers: { authorization: ASSEMBLYAI_API_KEY },
      }
    );

    const audioUrl = uploadResponse.data.upload_url;

    // Step 2: Request transcription
    const transcriptionResponse = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      { audio_url: audioUrl },
      {
        headers: { authorization: ASSEMBLYAI_API_KEY },
      }
    );

    const transcriptionId = transcriptionResponse.data.id;

    // Step 3: Poll for transcription completion
    let transcriptionStatus = 'processing';
    let transcriptText = '';

    while (transcriptionStatus === 'processing') {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds

      const statusResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptionId}`,
        {
          headers: { authorization: ASSEMBLYAI_API_KEY },
        }
      );

      transcriptionStatus = statusResponse.data.status;

      if (transcriptionStatus === 'completed') {
        transcriptText = statusResponse.data.text;
      } else if (transcriptionStatus === 'failed') {
        return res.status(500).json({ error: 'Transcription failed. Please try again.' });
      }
    }

    // Step 4: Return transcript to the frontend
    res.json({ transcript: transcriptText });

  } catch (error) {
    console.error('Error:', error.message || error);
    res.status(500).json({ error: 'Error processing the audio file.' });
  } finally {
    // Clean up uploaded file
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.error('Error cleaning up uploaded file:', cleanupError.message || cleanupError);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
