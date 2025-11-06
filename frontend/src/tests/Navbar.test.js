import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// eslint-disable-next-line no-undef
test('renders navbar links', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Quizzes/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Practice/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});
