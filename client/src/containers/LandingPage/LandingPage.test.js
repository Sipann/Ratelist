import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import LandingPage from './LandingPage';

// smoke test
it('renders without crashing', () => {
  render(<LandingPage />);
});
