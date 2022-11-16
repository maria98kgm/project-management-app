import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';

test('renders element', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  expect(screen.getByText(/En/i)).toBeInTheDocument();
});
