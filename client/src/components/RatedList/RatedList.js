import React from 'react';

import RatedItem from '../RatedItem/RatedItem';
import './RatedList.css';


function RatedList (props) {
  const tracks = props.ratedTracks.tracks;
  return (
    <div className='ratedList' data-testid="ratedList">
      {tracks.map((track, index) =>
        <RatedItem
          track={track}
          key={index}
        />)}
    </div>);
}

export default RatedList;
