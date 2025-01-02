"use client";

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useFrames } from "../contexts/FramesContext";

export const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const { addFrame } = useFrames();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      addFrame(imageSrc);
    }
  }, [addFrame]);

  return (
    <div className="mb-6">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg shadow-lg border "
      />
      <button
        onClick={capture}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Capture Frame
      </button>
    </div>
  );
};
