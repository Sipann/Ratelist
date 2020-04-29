import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';

import TrackItem from './TrackItem';
import dbService from '../../services/dbService';

import { fakeTrack } from '../../__mocks__/fakeTrack';


// smoke test
it('renders without crashing', () => {
  act(() => {
    render(<TrackItem track={fakeTrack} key={0} updateState={() => { }} />);
  });
});

it('sets the correct state rating value when cursor is moved', () => {
  const { getByTestId } = render(<TrackItem track={fakeTrack} key={0} updateState={() => { }} />);
  act(() => {
    fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  });
  expect(getByTestId('submitButton')).toHaveTextContent(8);
});

it('sets the trackId when cursor is moved', () => {
  const { getByTestId } = render(<TrackItem track={fakeTrack} key={0} updateState={() => { }} />);
  act(() => {
    fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  });
  const trackIdAttr = getByTestId('inputField').getAttribute('data-trackid');
  expect(trackIdAttr).toBeTruthy();
});

it('calls insertRating when called with proper parameters', async () => {
  dbService.insertRating = jest.fn();
  localStorage.setItem('userName', 'foo')
  const { container, getByTestId } = render(<TrackItem track={fakeTrack} key={0} updateState={() => { }} />);
  act(() => {
    fireEvent.change(getByTestId('inputField'), { target: { value: 8 } });
  });
  act(() => {
    fireEvent.submit(container.querySelector('form'));
  });
  await waitFor(() => {
    expect(dbService.insertRating).toHaveBeenCalled();
    localStorage.clear()
  });
});
