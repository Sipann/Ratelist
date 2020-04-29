import React, { useState } from 'react';
import classNames from 'classnames';

import { insertRating } from '../../services/dbService';

import './TrackItem.css';

function TrackItem (props) {

  const [color, setColor] = useState('rgb(73, 162, 218)');
  const [borderColor, SetBorderColor] = useState('1px solid white')
  const [trackId, setTrackId] = useState('');
  const [rating, setRating] = useState(null);
  const [buttonLabel, setButtonLabel] = useState('Select Rating');

  function OnClickEvent () {
    setColor('rgb(103, 182, 109)');
    SetBorderColor('1px solid rgb(103, 182, 109)');
  }

  const handleChange = (e) => {
    setRating(e.target.value);
    setButtonLabel('Rate: ');
    setTrackId(e.target.getAttribute('data-trackid'));
    setColor('#92a2a8')
  }

  function handleSubmit (e) {
    e && e.preventDefault();
    const userName = localStorage.getItem('userName');
    if (!rating) return;
    if (trackId && userName) insertRating({ userName, trackId, rating });
    setTrackId('');
    setButtonLabel('Rating stored: ');
  }

  const btnClass = classNames({
    rate_button: true,
    'rate_button_disabled': !rating
  });

  return (
    <div>
      <div className='track_container' style={{ border: borderColor }}>
        <div className='album_cover'>
          <img src={`${props.track.album.images[0].url}`} alt='album cover' />
        </div>
        <div className='track_info_rating'>
          <div className='track_details'>
            <p className='track_name'>{props.track.name}</p>
            <p className='album_name'>{props.track.album.name} - {props.track.artists[0].name}</p>
          </div>
          <form className='track_rating' onSubmit={handleSubmit}>
            <input
              className='rating_selector'
              type='range'
              id='rating'
              min='0'
              max='10'
              data-testid="inputField"
              data-trackid={props.track.id}
              onChange={handleChange}
            ></input>
            <button
              style={{ background: color }}
              type='submit'
              className={btnClass}
              disabled={!rating}
              data-testid="submitButton"
              onClick={() => { OnClickEvent() }}>{buttonLabel}{rating}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrackItem;
