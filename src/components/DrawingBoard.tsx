'use client';

import { useDrawingContext } from '@/contexts/DrawingProvider';
import {
  Tool,
  LineCap,
  ToolProps,
  INITIAL_LINE_WIDTH,
  GlobalCompositeOperation,
} from '@/types/entities.d';
import { classNames } from '@/utils/classNames';
import { useCallback, useEffect, useRef, useState } from 'react';
const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { tool, size, color } = useDrawingContext();

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.8;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = LineCap.ROUND;
    context.lineWidth = INITIAL_LINE_WIDTH;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const resetGlobalCompositeOperation = () => {
    if (contextRef.current) {
      contextRef.current.globalCompositeOperation =
        GlobalCompositeOperation.SOURCE_OVER;
    }
  };

  const handleFinishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const handleStartDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (tool === Tool.TEXT) {
      resetGlobalCompositeOperation();

      const text = prompt('Enter your text:');
      if (text && contextRef.current) {
        contextRef.current.font = `${size * 2}px Arial`;
        contextRef.current.fillStyle = color;
        contextRef.current.fillText(text, offsetX, offsetY);
      }
    } else if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const handleDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === Tool.TEXT) return;

    const { offsetX, offsetY } = event.nativeEvent;

    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY);

      if (tool === Tool.ERASE) {
        contextRef.current.globalCompositeOperation =
          GlobalCompositeOperation.DESTINATION_OUT;
        contextRef.current.lineWidth = size;
      } else {
        contextRef.current.globalCompositeOperation =
          GlobalCompositeOperation.SOURCE_OVER;
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = size;
      }

      contextRef.current.stroke();
    }
  };

  const getCursor = (tool: ToolProps) => {
    switch (tool) {
      case Tool.DRAW:
        return 'cursor-default';
      case Tool.ERASE:
        return 'cursor-eraser';
      case Tool.TEXT:
        return 'cursor-text';

      default:
        return 'cursor-default';
    }
  };

  return (
    <div className='flex p-4 h-screen justify-center items-center shadow-lg m-10 border lg:p-10 border-gray-600'>
      <canvas
        ref={canvasRef}
        className={classNames(
          'bg-white border-2 border-gray-400 cursor-crosshair w-full max-h-screen',
          getCursor(tool)
        )}
        onMouseLeave={handleFinishDrawing}
        onMouseUp={handleFinishDrawing}
        onMouseMove={handleDrawing}
        onMouseDown={handleStartDrawing}
      />
    </div>
  );
};

export default DrawingBoard;
