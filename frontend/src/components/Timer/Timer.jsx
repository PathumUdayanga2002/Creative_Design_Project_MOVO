import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AiBot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Handle the stop event of ReactMic
  const onStop = (recordedData) => {
    setAudioBlob(recordedData.blob);
    sendAudioToBackend(recordedData.blob);
  };

  // Send audio to AssemblyAI API and get transcription
  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);  // Set processing state to true

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    try {
      // Step 1: Upload audio to AssemblyAI
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'authorization': 'fd3c1c5222c942d5a1364d1b249f3283', // Your API key here
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      const audioUrl = uploadData.upload_url;

      // Step 2: Request transcription from AssemblyAI
      const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'authorization': 'fd3c1c5222c942d5a1364d1b249f3283', // Your API key here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio_url: audioUrl }),
      });

      const transcriptionData = await transcriptionResponse.json();
      const transcriptionId = transcriptionData.id;

      // Step 3: Poll for transcription status
      let transcriptionStatus = 'processing';
      let transcriptText = '';

      while (transcriptionStatus === 'processing') {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again

        const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptionId}`, {
          method: 'GET',
          headers: {
            'authorization': 'fd3c1c5222c942d5a1364d1b249f3283', // Your API key here
          },
        });

        const statusData = await statusResponse.json();
        transcriptionStatus = statusData.status;

        if (transcriptionStatus === 'completed') {
          transcriptText = statusData.text;
          setTranscript(transcriptText);
          setIsProcessing(false);  // Set processing state to false when transcription is done
        }
      }

    } catch (error) {
      console.error('Error during transcription:', error);
      setIsProcessing(false);  // Set processing state to false in case of error
      setTranscript('Error transcribing audio');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Speech to Text</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <button
            onClick={toggleRecording}
            className={`px-6 py-3 text-white font-semibold rounded-full transition-all duration-300 ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          <div className="mt-4">
            <ReactMic
              record={isRecording}
              className="w-full h-32 bg-gray-200 rounded-md"
              onStop={onStop}
              strokeColor="#000000"
              backgroundColor="#FF4081"
            />
          </div>
        </div>

        {isProcessing && (
          <div className="mt-4 text-gray-800">Processing your transcription...</div>
        )}

        {transcript && !isProcessing && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md text-gray-800">
            <h3 className="text-lg font-medium">Transcript</h3>
            <p className="mt-2">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiBot;
