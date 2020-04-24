import React from 'react';

import RatedItem from '../RatedItem/RatedItem';
import './RatedList.css';


function RatedList (props) {
  let tracks = props.ratedTracks.tracks
  return (
    <div className='ratedList'>
      {tracks.map((track, index) =>
        <RatedItem
          track={track}
          key={index}
        />)}
    </div>)
}

export default RatedList;