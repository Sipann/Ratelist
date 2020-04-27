import React from 'react';
import { render, waitForElement, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import dbService from '../../services/dbService';
import spotifyService from '../../services/spotifyService';
import { mockRatedTracks } from '../../__mocks__/SpotifyTracksItems';

import HomePage from './HomePage';

// smoke test
it('renders without crashing', () => {
  render(<HomePage />);
});

it('renders without crashing', async () => {
 dbService.getRatingsByUser = jest.fn(() => {
  return new Promise(function(resolve, reject) {
      resolve([
        {trackId:"1h2xVEoJORqrg71HocgqXd", rating:9},
        {trackId:"1HFiThfrSDT9byxv6cw8Tm", rating:0},
        {trackId:"6sCYUYJkkqP5wJG4ccLGuA", rating:6}
      ]);
    });
  });

  spotifyService.getTracks = jest.fn(() => {
    return new Promise(function(resolve, reject) {
        resolve(mockRatedTracks);
      });
    });

  const { container, getByTestId, getByText } = render(<HomePage />);
  await waitFor(() => {
    getByTestId('ratedList')
    expect(getByText('Berta Berta')).toBeInTheDocument();
    expect(getByText('Peter Pan')).toBeInTheDocument();
    expect(getByText('Superstition - Single Version')).toBeInTheDocument();
  });

});
