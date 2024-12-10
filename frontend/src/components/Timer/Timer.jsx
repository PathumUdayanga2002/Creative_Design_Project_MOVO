import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    socket.on('timerUpdate', (newTime) => {
      setTimeLeft(newTime);
    });

    socket.on('timerStopped', () => {
      setTimeLeft(0);
    });

    return () => socket.off(); // Cleanup
  }, []);

  const startTimer = () => socket.emit('startTimer');
  const stopTimer = () => socket.emit('stopTimer');
  const resetTimer = () => socket.emit('resetTimer');
  const adjustTimer = (newDuration) => socket.emit('adjustTimer', newDuration);

  // Convert timeLeft (in seconds) to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format time to always show 2 digits
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-mono">
      <h1 className="text-lg tracking-widest mb-4">TIMER</h1>
      <div className="text-8xl font-bold tracking-widest">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="mt-6 space-x-4">
        <button
          onClick={startTimer}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Reset
        </button>
        <button
          onClick={() => adjustTimer(300)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Set to 5 Minutes
        </button>
      </div>
    </div>
  );
};

export default Timer;
