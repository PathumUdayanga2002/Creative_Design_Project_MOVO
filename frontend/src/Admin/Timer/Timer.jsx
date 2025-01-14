import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

function Timer() {
  const [countdown, setCountdown] = useState({ time: 0, isRunning: false });

  useEffect(() => {
    // Listen for countdown updates
    socket.on("updateCountdown", (data) => {
      setCountdown(data);
      console.log(countdown.time);
    });

    return () => {
      socket.off("updateCountdown");
      
    };
  }, []);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time Remaining: {countdown.time}</p>
      <p>Status: {countdown.isRunning ? "Running" : "Stopped"}</p>
    </div>
  );
}

export default Timer;
