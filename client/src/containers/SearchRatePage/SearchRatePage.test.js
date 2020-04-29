import React from 'react';
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import dbService from '../../services/dbService';
import spotifyService from '../../services/spotifyService';

import SearchRatePage from './SearchRatePage';

import { mockRatedTracks } from '../../__mocks__/SpotifyTracksItems';



it('renders without crashing', async () => {
  dbService.getRatingsByUser = jest.fn(() => {
    return new Promise(function (resolve, reject) {
      resolve([
        { trackId: "1h2xVEoJORqrg71HocgqXd", rating: 9 },
        { trackId: "1HFiThfrSDT9byxv6cw8Tm", rating: 0 },
        { trackId: "6sCYUYJkkqP5wJG4ccLGuA", rating: 6 }
      ]);
    });
  });

  spotifyService.getTracks = jest.fn(() => {
    return new Promise(function (resolve, reject) {
      resolve(mockRatedTracks);
    });
  });

  const mockedUpdateList = jest.fn(() => { });
  const mockedUpdateEmpty = jest.fn(() => { });

  render(<Router><SearchRatePage updateList={mockedUpdateList} updateEmpty={mockedUpdateEmpty} /></Router>);;
  await waitFor(() => {
    expect(mockedUpdateList).toHaveBeenCalled()
  });

});
