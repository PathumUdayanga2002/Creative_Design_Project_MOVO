import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const SimpleAudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    const current = audioRef.current.currentTime;
    const totalDuration = audioRef.current.duration;
    setProgress((current / totalDuration) * 100);
    setCurrentTime(formatTime(current));
    if (!isNaN(totalDuration)) setDuration(formatTime(totalDuration));
  };

  const handleSeek = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const totalDuration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * totalDuration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', updateProgress);
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', updateProgress);
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <div className="w-full flex items-center justify-between mb-2 text-sm text-gray-600">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
      <div
        className="w-full h-2 bg-gray-300 rounded-full cursor-pointer relative"
        onClick={handleSeek}
      >
        <div
          className="h-2 bg-orange-600 rounded-full absolute top-0 left-0"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={togglePlayPause}
          className="p-2 text-white bg-orange-600 rounded-full hover:bg-orange-700 mx-2 flex items-center justify-center"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default SimpleAudioPlayer;
