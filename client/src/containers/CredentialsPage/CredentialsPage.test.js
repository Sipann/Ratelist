import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import CredentialsPage from './CredentialsPage';

// smoke test
it('renders without crashing', () => {
  render(<CredentialsPage />);
});
