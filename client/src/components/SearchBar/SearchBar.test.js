import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

import SearchBar from './SearchBar';


const mockedGetTracks = jest.fn(() => {
  console.log('it renders');
});

// smoke test
it('renders withoug crashing', () => {
  render(<SearchBar getTracks={mockedGetTracks} />);
});

it('calls getTracks on user input', () => {
  const { getByTestId } = render(<SearchBar getTracks={mockedGetTracks} />);
  fireEvent.change(getByTestId('inputField'), { target: { value: 'a' } });
  expect(mockedGetTracks).toHaveBeenCalled();
});
