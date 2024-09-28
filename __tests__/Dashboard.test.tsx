import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import DashboardPage from '@/app/dashboard/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DashboardPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the welcome message', () => {
    render(<DashboardPage />);

    const welcomeHeading = screen.getByRole('heading', { level: 3 });
    const welcomeText = screen.getByText(/Get started by creating a new draw/i);

    expect(welcomeHeading).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });

  it('navigates to the board page when the button is clicked', () => {
    render(<DashboardPage />);

    const newDrawButton = screen.getByRole('button', { name: /New Draw/i });

    fireEvent.click(newDrawButton);

    expect(mockPush).toHaveBeenCalledWith('/board');
  });
});
