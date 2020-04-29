import React from 'react';

import TrackItem from '../TrackItem/TrackItem';
import './TrackList.css';


function TrackList (props) {
  let tracks = props.tracks.tracks.items
  return (
    <div data-testid="trackList">
      {tracks.map(track =>
        <TrackItem
          track={track}
          key={track.id}
          updateState={props.updateState}
        />)}
    </div>)
}

export default TrackList;
