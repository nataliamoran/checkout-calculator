import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders calculator', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Checkout Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
