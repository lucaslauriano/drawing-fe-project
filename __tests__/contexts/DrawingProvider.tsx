import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DrawingProvider, useDrawingContext } from '@/contexts/DrawingProvider';
import { Tool } from '@/types/entities.d';

const TestComponent: React.FC = () => {
  const { color, tool, size, setColor, setTool, setSize, clearBoard } =
    useDrawingContext();

  return (
    <div>
      <div data-testid='color'>{color}</div>
      <div data-testid='tool'>{tool}</div>
      <div data-testid='size'>{size}</div>
      <button onClick={() => setColor('#ff0000')}>Set Red</button>
      <button onClick={() => setTool(Tool.ERASE)}>Set Eraser</button>
      <button onClick={() => setSize(10)}>Set Size 10</button>
      <button onClick={clearBoard}>Clear Board</button>
    </div>
  );
};

describe('DrawingProvider', () => {
  it('provides default values', () => {
    render(
      <DrawingProvider>
        <TestComponent />
      </DrawingProvider>
    );

    expect(screen.getByTestId('color').textContent).toBe('#000000');
    expect(screen.getByTestId('tool').textContent).toBe(Tool.DRAW);
    expect(screen.getByTestId('size').textContent).toBe('5');
  });

  it('updates color', () => {
    render(
      <DrawingProvider>
        <TestComponent />
      </DrawingProvider>
    );

    fireEvent.click(screen.getByText('Set Red'));
    expect(screen.getByTestId('color').textContent).toBe('#ff0000');
  });

  it('updates tool', () => {
    render(
      <DrawingProvider>
        <TestComponent />
      </DrawingProvider>
    );

    fireEvent.click(screen.getByText('Set Eraser'));
    expect(screen.getByTestId('tool').textContent).toBe(Tool.ERASE);
  });

  it('updates size', () => {
    render(
      <DrawingProvider>
        <TestComponent />
      </DrawingProvider>
    );

    fireEvent.click(screen.getByText('Set Size 10'));
    expect(screen.getByTestId('size').textContent).toBe('10');
  });

  it('calls clearBoard function', () => {
    const clearRectMock = jest.fn();
    const canvasMock = document.createElement('canvas');
    Object.defineProperty(canvasMock, 'getContext', {
      value: jest.fn(() => ({
        clearRect: clearRectMock,
      })),
    });

    document.body.appendChild(canvasMock);

    render(
      <DrawingProvider>
        <TestComponent />
      </DrawingProvider>
    );

    fireEvent.click(screen.getByText('Clear Board'));
    expect(clearRectMock).toHaveBeenCalledWith(
      0,
      0,
      canvasMock.width,
      canvasMock.height
    );
  });
});
