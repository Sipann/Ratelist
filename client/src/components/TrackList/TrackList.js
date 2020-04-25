import React from 'react';

import TrackItem from '../TrackItem/TrackItem';
import './TrackList.css';


function TrackList (props) {
  let tracks = props.tracks.tracks.items
  return (
    <div data-testid="trackList">
      {tracks.map((track, index) =>
        <TrackItem
          track={track}
          key={index}
        />)}
    </div>)
}

export default TrackList;
