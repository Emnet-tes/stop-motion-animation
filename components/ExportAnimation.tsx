"use client";

import React, { useState } from "react";
import { useFrames } from "../contexts/FramesContext";

export const ExportAnimation: React.FC = () => {
  const { frames } = useFrames();
  const [isExporting, setIsExporting] = useState(false);

  const exportAnimation = async () => {
    if (frames.length === 0) return;

    setIsExporting(true);

    try {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Set canvas size (assuming all frames are the same size)
      const img = new Image();
      img.src = frames[0].dataUrl;
      await new Promise((resolve) => (img.onload = resolve));
      canvas.width = img.width;
      canvas.height = img.height;

      // Create a MediaRecorder to record the canvas
      const stream = canvas.captureStream(30); // 30 fps
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "stop-motion-animation.webm";
        a.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
      };

      mediaRecorder.start();

      // Draw each frame on the canvas
      for (let i = 0; i < frames.length; i++) {
        img.src = frames[i].dataUrl;
        await new Promise((resolve) => (img.onload = resolve));
        ctx.drawImage(img, 0, 0);
        await new Promise((resolve) => setTimeout(resolve, 1000 / 12)); // 12 fps
      }

      mediaRecorder.stop();
    } catch (error) {
      console.error("Error exporting animation:", error);
      setIsExporting(false);
    }
  };

  return (
    <div>
      <button
        onClick={exportAnimation}
        disabled={frames.length === 0 || isExporting}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        {isExporting ? "Exporting..." : "Export as WebM"}
      </button>
    </div>
  );
};
