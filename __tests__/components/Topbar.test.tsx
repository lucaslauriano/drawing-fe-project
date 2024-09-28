import { render, screen, fireEvent } from '@testing-library/react';
import { useDrawingContext } from '@/contexts/DrawingProvider';
import Topbar from '@/components/Topbar';
import { Tool } from '@/types/entities.d';

jest.mock('../../src/contexts/DrawingProvider', () => ({
  useDrawingContext: jest.fn(),
}));

describe('Topbar', () => {
  const mockSetSize = jest.fn();

  beforeEach(() => {
    (useDrawingContext as jest.Mock).mockReturnValue({
      tool: Tool.DRAW,
      setSize: mockSetSize,
      size: 5,
    });
  });

  it('calls setSize when the RangeSlider value changes', () => {
    render(<Topbar />);
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '10' } });
    expect(mockSetSize).toHaveBeenCalledWith(10);
  });
});
