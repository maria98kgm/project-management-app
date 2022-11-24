import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from '../components/Header';
import { store } from '../redux/store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

test('renders element', () => {
  render(
    <Router>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
  expect(screen.getByText(/En/i)).toBeInTheDocument();
});
