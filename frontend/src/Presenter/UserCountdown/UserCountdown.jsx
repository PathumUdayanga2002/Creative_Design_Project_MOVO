import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPlay, FaStop, FaRedoAlt, FaRegClock } from "react-icons/fa"; // Added FaRedoAlt for reset icon
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; // Circular progress bar
import "react-circular-progressbar/dist/styles.css"; // Import default styles

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const UserCountdown = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // To store the total time for progress bar

  useEffect(() => {
    // Listen for updates from the server
    socket.on("updateCountdown", (data) => {
      setTime(data.time);
      setIsRunning(data.isRunning);
    });

    return () => {
      socket.off("updateCountdown");
    };
  }, []);


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
        <h1 className="text-3xl font-bold mb-6 text-center">Your Time</h1>

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
          
        </div>

        {/* Input Fields with Set Time Button */}
        <div className="flex items-center space-x-4">

          
        </div>
      </div>
    </div>
  );
};

export default UserCountdown;
