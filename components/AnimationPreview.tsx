"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFrames } from "../contexts/FramesContext";

export const AnimationPreview: React.FC = () => {
  const { frames } = useFrames();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(12);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && frames.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
      }, 1000 / fps);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, currentFrame, frames.length, fps]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Animation Preview</h2>
      <div className="bg-gray-200 rounded-lg p-4 mb-4">
        {frames.length > 0 ? (
          <img
            src={frames[currentFrame].dataUrl}
            alt={`Frame ${currentFrame + 1}`}
            className="w-full h-64 object-contain"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-gray-500">
            No frames captured yet
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          disabled={frames.length === 0}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={resetAnimation}
          disabled={frames.length === 0}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Reset
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">FPS:</span>
        <input
          type="range"
          min="1"
          max="30"
          value={fps}
          onChange={(e) => setFps(parseInt(e.target.value))}
          className="w-48"
        />
        <span className="text-sm">{fps}</span>
      </div>
    </div>
  );
};
