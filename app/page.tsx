"use client";

import { AnimationPreview } from "@/components/AnimationPreview";
import { ExportAnimation } from "@/components/ExportAnimation";
import { FrameGallery } from "@/components/FrameGallery";
import { WebcamCapture } from "@/components/WebcamCapture";
import { FramesProvider } from "@/contexts/FramesContext";
import React from "react";


export default function StopMotionCreator() {
  return (
    <FramesProvider>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Stop Motion Creator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <WebcamCapture />
            <AnimationPreview />
            <ExportAnimation />
          </div>
          <FrameGallery />
        </div>
      </main>
    </FramesProvider>
  );
}
