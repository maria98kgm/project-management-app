import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

describe('App', () => {
  test('Test for app presence', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
});
