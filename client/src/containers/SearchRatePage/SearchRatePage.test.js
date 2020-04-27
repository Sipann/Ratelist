import React from 'react';
import { render, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';

import SearchRatePage from './SearchRatePage';

// smoke test
it('renders without crashing', async () => {
  render(<SearchRatePage />);
});
