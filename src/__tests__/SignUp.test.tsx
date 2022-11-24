import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';

describe('Sign Up', () => {
  test('Test for form presence', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });
});
