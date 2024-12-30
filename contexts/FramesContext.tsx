"use client";

import React, { createContext, useState, useContext } from "react";

interface Frame {
  id: string;
  dataUrl: string;
}

interface FramesContextType {
  frames: Frame[];
  addFrame: (dataUrl: string) => void;
  removeFrame: (id: string) => void;
  reorderFrames: (startIndex: number, endIndex: number) => void;
}

const FramesContext = createContext<FramesContextType | undefined>(undefined);

export const useFrames = () => {
  const context = useContext(FramesContext);
  if (!context) {
    throw new Error("useFrames must be used within a FramesProvider");
  }
  return context;
};

export const FramesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [frames, setFrames] = useState<Frame[]>([]);

  const addFrame = (dataUrl: string) => {
    setFrames((prevFrames) => [
      ...prevFrames,
      { id: Date.now().toString(), dataUrl },
    ]);
  };

  const removeFrame = (id: string) => {
    setFrames((prevFrames) => prevFrames.filter((frame) => frame.id !== id));
  };

  const reorderFrames = (startIndex: number, endIndex: number) => {
    setFrames((prevFrames) => {
      const result = Array.from(prevFrames);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <FramesContext.Provider
      value={{ frames, addFrame, removeFrame, reorderFrames }}
    >
      {children}
    </FramesContext.Provider>
  );
};
