import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";

import NavigationBar from './NavigationBar';

// smoke test
it('renders withoug crashing', () => {
  render(<Router><NavigationBar /></Router>);
});
