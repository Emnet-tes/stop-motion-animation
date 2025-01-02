"use client";

import { useState } from "react";
import Link from "next/link";
import FruitAnimation from "@/components/fruit-animation";
import { WebcamCapture } from "@/components/WebcamCapture";
import { AnimationPreview } from "@/components/AnimationPreview";
import { ExportAnimation } from "@/components/ExportAnimation";
import { FrameGallery } from "@/components/FrameGallery";
import { FramesProvider } from "@/contexts/FramesContext";

export default function Page() {
  const [showWebCapture, setShowWebCapture] = useState(false);
  const [showFruitAnimation, setShowFruitAnimation] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold text-center">
        Stop Motion Creator
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => {
            setShowWebCapture(true);
            setShowFruitAnimation(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          WebCapture
        </button>
        <button
          onClick={() => {
            setShowFruitAnimation(true);
            setShowWebCapture(false);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Animation
        </button>
      </div>

      {showWebCapture && (
        <FramesProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <WebcamCapture />
              <AnimationPreview />
              <ExportAnimation />
            </div>
            <FrameGallery />
          </div>
        </FramesProvider>
      )}

      {showFruitAnimation && (
        <div className="rounded-lg border p-4 bg-gray-100">
          <h2 className="mb-4 text-xl font-semibold text-black">Fruit Animation</h2>
          <FruitAnimation />
        </div>
      )}
    </div>
  );
}