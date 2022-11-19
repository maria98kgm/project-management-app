import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../components/Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

test('renders element', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  expect(screen.getByText(/En/i)).toBeInTheDocument();
});
