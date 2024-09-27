'use client';

import { useEffect, useRef, useState } from 'react';

const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 1000;
    canvas.height = 600;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const handleFinishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.moveTo(e.clientX, e.clientY);
        canvasRef.current.onmousemove = (e) => {
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
        };
        canvasRef.current.onmouseup = handleFinishDrawing;
      }
    }
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log(e);
  };
  return (
    <div className='flex justify-center items-center shadow-lg m-10 border p-20 border-gray-600 '>
      <canvas
        ref={canvasRef}
        className='bg-white border-2 border-gray-400 cursor-crosshair'
        onMouseUp={handleFinishDrawing}
        onMouseMove={handleDrawing}
        onMouseDown={handleStartDrawing}
      />
    </div>
  );
};
export default DrawingBoard;
