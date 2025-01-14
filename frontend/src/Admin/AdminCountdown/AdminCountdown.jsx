import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPlay, FaStop, FaRedoAlt, FaRegClock } from "react-icons/fa"; // Added FaRedoAlt for reset icon
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // Circular progress bar
import "react-circular-progressbar/dist/styles.css"; // Import default styles

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const AdminCountdown = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [newMinutes, setNewMinutes] = useState("");
  const [newSeconds, setNewSeconds] = useState("");
  const [totalTime, setTotalTime] = useState(0); // To store the total time for progress bar

  useEffect(() => {
    // Listen for updates from the server
    socket.on("updateCountdown", (data) => {
      setTime(data.time);
      setIsRunning(data.isRunning);
      console.log("time:",time);
    });

    return () => {
      socket.off("updateCountdown");
    };
  }, []);

  const handleStart = () => {
    socket.emit("startCountdown");
  };

  const handleStop = () => {
    socket.emit("stopCountdown");
  };

  const handleSetTime = () => {
    const timeInSeconds = parseInt(newMinutes || 0) * 60 + parseInt(newSeconds || 0); // Convert minutes and seconds to total seconds
    setTotalTime(timeInSeconds); // Update total time for circular progress bar
    socket.emit("setCountdown", timeInSeconds);
  };

  const handleReset = () => {
    setTime(totalTime); // Reset the timer to the initially set total time
    socket.emit("resetCountdown", totalTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Calculate percentage for circular progress bar
  const percentage = (time / totalTime) * 100;

  // Dynamically determine the path color based on remaining time
  const getPathColor = () => {
    const timeRatio = time / totalTime;
    if (timeRatio <= 0.2) return "#FF0000"; // Red when less than or equal to 20% time left
    return "#4CAF50"; // Green otherwise
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <style>
        {`
          .CircularProgressbar-text {
            dominant-baseline: middle;
            text-anchor: middle;
            font-size: 24px;
            fill: #333; /* Text color */
          }
        `}
      </style>
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Set Your Time</h1>

        {/* Circular Progress Bar */}
        <div className="mb-6 flex justify-center items-center">
          <CircularProgressbar
            value={percentage}
            text={formatTime(time)}
            styles={buildStyles({
              pathColor: getPathColor(), // Dynamically set path color
              textColor: "#333", // Dark color for text
              trailColor: "#D3D3D3", // Light gray trail
              strokeLinecap: "round", // Smooth path edges
            })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600"
          >
            <FaPlay size={24} />
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600"
          >
            <FaStop size={24} />
          </button>
          <button
            onClick={handleReset}
            className="bg-yellow-500 text-white p-4 rounded-full hover:bg-yellow-600"
          >
            <FaRedoAlt size={24} />
          </button>
        </div>

        {/* Input Fields with Set Time Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaRegClock className="text-gray-700" size={20} />
            <input
              type="number"
              value={newMinutes}
              onChange={(e) => setNewMinutes(e.target.value)}
              className="border rounded p-3 w-20 text-center"
              placeholder="Minutes"
              min="0"
            />
            <span className="text-gray-700 font-bold">:</span>
            <input
              type="number"
              value={newSeconds}
              onChange={(e) => setNewSeconds(e.target.value)}
              className="border rounded p-3 w-20 text-center"
              placeholder="Seconds"
              min="0"
              max="59"
            />
          </div>
          <button
            onClick={handleSetTime}
            className="bg-blue-500 text-white font-bold p-4 rounded-full hover:bg-blue-600"
          >
            Set Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCountdown;
