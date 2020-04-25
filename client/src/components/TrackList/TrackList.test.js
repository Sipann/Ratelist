import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import TrackList from './TrackList';
import { spotifyTracksList } from '../../__mocks__/SpotifyTracksList';


// smoke test
it('renders without crashing', () => {
  render(<TrackList tracks={spotifyTracksList} />);
});

it('renders as many TrackItem components as there are tracks provided to TrackList', () => {
  const { getByTestId } = render(<TrackList tracks={spotifyTracksList} />);
  expect(getByTestId('trackList').children.length).toBe(spotifyTracksList.tracks.items.length);
});
