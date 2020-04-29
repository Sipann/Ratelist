import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

import TrackItem from './TrackItem';
import dbService from '../../services/dbService';

import { fakeTrack } from '../../__mocks__/fakeTrack';


// smoke test
it('renders without crashing', () => {
  render(<TrackItem track={fakeTrack} key={0} />);
});

it('sets the correct state rating value when cursor is moved', () => {
  const { getByTestId } = render(<TrackItem track={fakeTrack} key={0} />);
  fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  expect(getByTestId('submitButton')).toHaveTextContent(8);
});

it('sets the trackId when cursor is moved', () => {
  const { getByTestId } = render(<TrackItem track={fakeTrack} key={0} />);
  fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  const trackIdAttr = getByTestId('inputField').getAttribute('data-trackid');
  expect(trackIdAttr).toBeTruthy();
});

it('calls insertRating when called with proper parameters', () => {
  dbService.insertRating = jest.fn();
  localStorage.setItem('userName', 'foo')
  const { container, getByTestId } = render(<TrackItem track={fakeTrack} key={0} />);
  fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  fireEvent.submit(container.querySelector('form'));
  expect(dbService.insertRating).toHaveBeenCalled();
  localStorage.clear()
});
