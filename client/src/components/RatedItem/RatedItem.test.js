import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import RatedItem from './RatedItem';

const fakeTrack = {
  name: 'Berta Berta',
  album: {
    images: [{ url: 'fakeurl' }],
    name: 'unknown',
  },
  artists: [
    { name: 'jojo' }
  ],
};

// smoke test
it('renders withoug crashing', () => {
  render(<RatedItem track={fakeTrack} />);
});


it('renders RatedItem component with proper track props', async () => {
  const { getByText } = render(<RatedItem track={fakeTrack} />);
  expect(getByText('Berta Berta')).toBeInTheDocument();
});

it('does not display when no track props is passed', async () => {
  // expect(render(<RatedItem />)).toThrow();
});
