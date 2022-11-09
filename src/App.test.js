import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders div element', () => {
  render(<App />);
  const divElement = screen.getByText(/RS manager/i);
  expect(divElement).toBeInTheDocument();
});
