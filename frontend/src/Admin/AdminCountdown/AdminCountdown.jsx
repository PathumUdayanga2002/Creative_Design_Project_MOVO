import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const AdminCountdown = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [newTime, setNewTime] = useState("");

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

  const handleStart = () => {
    socket.emit("startCountdown");
  };

  const handleStop = () => {
    socket.emit("stopCountdown");
  };

  const handleSetTime = () => {
    const timeInSeconds = parseInt(newTime) * 60; // Convert minutes to seconds
    socket.emit("setCountdown", timeInSeconds);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Countdown</h1>
      <div className="text-4xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
        <div>
          <label htmlFor="set-time" className="mr-2">
            Set Time (mins):
          </label>
          <input
            type="number"
            id="set-time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border rounded px-2"
          />
        </div>
        <button
          onClick={handleSetTime}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Set Time
        </button>
      </div>
    </div>
  );
};

export default AdminCountdown;
