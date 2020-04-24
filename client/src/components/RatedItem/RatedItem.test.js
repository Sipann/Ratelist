import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import RatedItem from './RatedItem';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('renders RatedItem component', () => {
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
  act(() => {
    render(<RatedItem track={fakeTrack} />, container);
  });
  expect(container.querySelector('.track_name').textContent).toBe('Berta Berta');
});
