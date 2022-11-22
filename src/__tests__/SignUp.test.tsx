import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';
import { store } from '../redux/store';

describe('Sign Up', () => {
  test('Test for form presence', () => {
    render(
      <Router>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </Router>
    );

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });
});
