import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { mockRatedTracks } from '../../__mocks__/ExpectedRateList';

import HomePage from './HomePage';


// smoke test
it('renders without crashing', () => {
  render(<Router><HomePage rateList={mockRatedTracks.tracks} isEmpty={false} /></Router>);
});
