'use client';

import { useDrawingContext } from '@/contexts/DrawningProvider';
import {
  Tool,
  LineCap,
  ToolProps,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
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

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = LineCap.ROUND;
    context.lineWidth = INITIAL_LINE_WIDTH;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

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
    <div className='flex justify-center items-center shadow-lg m-10 border p-20 border-gray-600'>
      <canvas
        ref={canvasRef}
        className={classNames(
          'bg-white border-2 border-gray-400 cursor-crosshair',
          getCursor(tool)
        )}
        onMouseUp={handleFinishDrawing}
        onMouseMove={handleDrawing}
        onMouseDown={handleStartDrawing}
      />
    </div>
  );
};

export default DrawingBoard;
