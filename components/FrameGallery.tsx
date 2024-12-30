"use client";

import React from "react";
import { useFrames } from "../contexts/FramesContext";

export const FrameGallery: React.FC = () => {
  const { frames, removeFrame } = useFrames();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Frames</h2>
      <div className="space-y-4">
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className="bg-white p-2 rounded-lg shadow-md flex items-center"
          >
            <img
              src={frame.dataUrl}
              alt={`Frame ${index + 1}`}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <span className="flex-grow">Frame {index + 1}</span>
            <button
              onClick={() => removeFrame(frame.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
