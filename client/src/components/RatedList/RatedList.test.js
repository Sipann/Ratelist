import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import RatedList from './RatedList';
import { mockRatedTracks } from '../../__mocks__/SpotifyTracksItems';


// smoke test
it('renders withoug crashing', () => {
  render(<RatedList ratedTracks={mockRatedTracks} />);
});

it('renders as many RatedItem components as there are tracks provided to RatedList', () => {
  const { getByTestId } = render(<RatedList ratedTracks={mockRatedTracks} />);
  expect(getByTestId('ratedList').children.length).toBe(mockRatedTracks.tracks.length);
});
