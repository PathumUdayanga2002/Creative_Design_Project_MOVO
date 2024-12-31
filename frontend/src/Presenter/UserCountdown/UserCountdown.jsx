import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const UserCountdown = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Listen for updates from the server
    socket.on("updateCountdown", (data) => {
      setTime(data.time);
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

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Countdown</h1>
      <div className="text-4xl font-mono">{formatTime(time)}</div>
    </div>
  );
};

export default UserCountdown;
