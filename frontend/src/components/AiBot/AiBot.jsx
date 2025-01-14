import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        audioChunks.current = [];
        await sendAudioToBackend(blob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe the audio");
      }

      const data = await response.json();
      setTranscript(data.transcript);
      setFeedback(`The transcription is ${data.transcript.length} characters long.`);
    } catch (error) {
      console.error("Error during transcription:", error);
      setTranscript("Error transcribing audio");
      setFeedback("Unable to provide feedback due to an error.");
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700 p-6 text-white">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Speech to Text AI Bot</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div
            className={`w-20 h-20 flex items-center justify-center rounded-full transition-all duration-500 ${
              isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
            }`}
          >
            <button onClick={toggleRecording}>
              {isRecording ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-4">
            <div
              className={`w-64 h-16 bg-gray-100 rounded-md flex items-center justify-center ${
                isRecording ? "animate-pulse" : ""
              }`}
            >
              <span className="text-gray-700 text-sm">
                {isRecording ? "Recording..." : "Click to Start Recording"}
              </span>
            </div>
          </div>
        </div>

        {audioUrl && (
          <div className="mt-6">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/webm" />
            </audio>
          </div>
        )}

        {transcript && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-800">
            <h3 className="text-lg font-semibold mb-2">Transcription</h3>
            <p>{transcript}</p>
          </div>
        )}

        {feedback && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg shadow-inner text-gray-800">
            <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
            <p>{feedback}</p>
          </div>
        )}

        <button
          onClick={toggleHelp}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          {showHelp ? "Hide Help" : "Show Help"}
        </button>

        {showHelp && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-800">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <ul className="list-disc pl-4">
              <li>Click the green button to start recording.</li>
              <li>Click the red button to stop recording.</li>
              <li>Once recording stops, the audio will be processed and displayed below.</li>
              <li>Listen to your recording using the provided audio player.</li>
              <li>Review the transcription and feedback.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
