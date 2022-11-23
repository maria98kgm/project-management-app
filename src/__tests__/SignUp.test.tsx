import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SignUp } from '../pages/SignUp';

describe('Sign Up', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  const store = mockStore(initialState);

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
