"use client";

import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import { useFrames } from "../contexts/FramesContext";

export const FrameGallery: React.FC = () => {
  const { frames, removeFrame } = useFrames();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-black">Frames</h2>
      <div className="space-y-4">
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className="bg-white p-2 rounded-lg shadow-md flex items-center"
          >
            <div className="relative w-24 h-24 rounded mr-4">
              <Image
                src={frame.dataUrl}
                alt={`Frame ${index + 1}`}
                className="object-cover rounded"
                layout="fill" // Makes the image fill the container
                priority // Optional: Ensures the images are loaded quickly
              />
            </div>
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
