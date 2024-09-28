import { render, screen, fireEvent } from '@testing-library/react';
import { useDrawingContext } from '@/contexts/DrawingProvider';
import Sidebar from '@/components/Sidebar';
import { Tool } from '@/types/entities.d';
import { useRouter } from 'next/navigation';

jest.mock('../../src/contexts/DrawingProvider', () => ({
  useDrawingContext: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Sidebar', () => {
  const mockSetTool = jest.fn();
  const mockClearBoard = jest.fn();
  const mockSetColor = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useDrawingContext as jest.Mock).mockReturnValue({
      setTool: mockSetTool,
      clearBoard: mockClearBoard,
      setColor: mockSetColor,
      tool: Tool.DRAW,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders buttons with correct titles', () => {
    render(<Sidebar />);
    expect(screen.getByTitle('home')).toBeInTheDocument();
    expect(screen.getByTitle(Tool.DRAW)).toBeInTheDocument();
    expect(screen.getByTitle(Tool.ERASE)).toBeInTheDocument();
    expect(screen.getByTitle(Tool.CLEAR)).toBeInTheDocument();
    expect(screen.getByTitle(Tool.TEXT)).toBeInTheDocument();
  });

  it('calls handleClickGoToHome when home button is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTitle('home'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('calls setTool with Tool.DRAW when draw button is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTitle(Tool.DRAW));
    expect(mockSetTool).toHaveBeenCalledWith(Tool.DRAW);
  });

  it('calls setTool with Tool.ERASE when erase button is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTitle(Tool.ERASE));
    expect(mockSetTool).toHaveBeenCalledWith(Tool.ERASE);
  });

  it('calls clearBoard when clear button is clicked', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTitle(Tool.CLEAR));
    expect(mockClearBoard).toHaveBeenCalled();
  });

  it('calls setTool and setColor when color input changes', () => {
    render(<Sidebar />);
    const colorInput = screen.getByTitle('pallet');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    expect(mockSetTool).toHaveBeenCalledWith(Tool.DRAW);
    expect(mockSetColor).toHaveBeenCalledWith('#ff0000');
  });
});
