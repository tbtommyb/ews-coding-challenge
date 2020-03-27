import React from 'react';
import { renderWithRedux } from '../utils/testHelpers';

import App from './App';

test('renders heading', () => {
  const { getByText } = renderWithRedux(<App />);
  const header = getByText(/JP Morgan Chase :: EWS :: Coding challenge/);
  expect(header).toBeInTheDocument();
});
