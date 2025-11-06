import { render, screen } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-undef
test('renders homepage heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Welcome to Placement Prep Platform/i);
  // eslint-disable-next-line no-undef
  expect(heading).toBeInTheDocument();
});
