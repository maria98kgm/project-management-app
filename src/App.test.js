import { render, screen } from '@testing-library/react';
import { Header } from './components/Header';

test('renders element', () => {
  render(<Header />);
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});
