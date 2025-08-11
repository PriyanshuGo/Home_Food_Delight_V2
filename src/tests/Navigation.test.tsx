import { render, screen } from '@testing-library/react';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders all nav links', () => {
    render(<Navigation />);
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('highlights the active nav link', () => {
    (usePathname as jest.Mock).mockReturnValue('/menu');
    render(<Navigation />);
    const menuLink = screen.getByText(/menu/i);
    expect(menuLink).toHaveClass('text-saffron');
  });

});
