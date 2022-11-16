import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders div element', () => {
  render(<App />);

  const header = screen.getByText(/Header/i);
  expect(header).toBeInTheDocument();
});
