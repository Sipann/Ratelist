import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import CredentialsPage from './CredentialsPage';

// smoke test
it('renders without crashing', () => {
  render(<Router><CredentialsPage /></Router>);
});
