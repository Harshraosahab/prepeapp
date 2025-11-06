

import { render, screen } from '@testing-library/react';
import Login from '../../pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-undef
test('renders login form', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // eslint-disable-next-line no-undef
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});
