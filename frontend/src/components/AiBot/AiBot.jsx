import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AiBot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState(''); // Added feedback state

  const toggleRecording = () => {
    setIsRecording((prevState) => {
      console.log('Toggling recording to:', !prevState); // Debug log
      return !prevState;
    });
  };

  const onStop = (recordedData) => {
    console.log('Recording stopped:', recordedData); // Debug log
    if (recordedData && recordedData.blob) {
      setAudioBlob(recordedData.blob);
      sendAudioToBackend(recordedData.blob);
    } else {
      console.error('No audio data received');
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    try {
      const response = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe the audio');
      }

      const data = await response.json();
      setTranscript(data.transcript);

      // Example feedback logic
      const aiFeedback = `The transcription is ${data.transcript.length} characters long.`;
      setFeedback(aiFeedback); // Update feedback based on the transcript
    } catch (error) {
      console.error('Error during transcription:', error);
      setTranscript('Error transcribing audio');
      setFeedback('Unable to provide feedback due to an error.');
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
              onStop={onStop} // Handles stop events
              className="w-64 h-16 bg-gray-200 rounded-md"
              strokeColor="#FF4081"
              backgroundColor="#F0F0F0"
            />
          </div>
        </div>

        {transcript && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md text-gray-800 max-h-48 overflow-y-auto">
            <h3 className="text-lg font-medium">Transcript</h3>
            <p className="mt-2">{transcript}</p>
          </div>
        )}

        {/* {feedback && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md text-gray-800">
            <h3 className="text-lg font-medium">AI Feedback</h3>
            <p className="mt-2">{feedback}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AiBot;
