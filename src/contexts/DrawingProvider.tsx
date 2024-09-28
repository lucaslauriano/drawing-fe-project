'use client';

import { DrawingProviderProps, Tool, ToolProps } from '@/types/entities.d';
import { createContext, useContext, useState } from 'react';

interface DrawingContextProps {
  color: string;
  tool: ToolProps;
  size: number;
  clearBoard: () => void;
  setColor: (color: string) => void;
  setTool: (tool: ToolProps) => void;
  setSize: (size: number) => void;
}

const DrawingContext = createContext<DrawingContextProps | undefined>(
  undefined
);

export const useDrawingContext = () => {
  const context = useContext(DrawingContext);
  if (!context) {
    throw new Error('useDrawingContext must be used within a DrawingProvider');
  }
  return context;
};

export const DrawingProvider = ({ children }: DrawingProviderProps) => {
  const [color, setColor] = useState<string>('#000000');
  const [tool, setTool] = useState<ToolProps>(Tool.DRAW);
  const [size, setSize] = useState<number>(5);

  const clearBoard = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <DrawingContext.Provider
      value={{ color, tool, size, setColor, setTool, setSize, clearBoard }}
    >
      {children}
    </DrawingContext.Provider>
  );
};
