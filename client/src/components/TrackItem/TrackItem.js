import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { insertRating } from '../../services/dbService';

import './TrackItem.css';

function TrackItem (props) {

  const [color, setColor] = useState('rgb(73, 162, 218)');
  const [borderColor, SetBorderColor] = useState('1px solid white')
  const [rating, setRating] = useState(5);
  const [buttonLabel, setButtonLabel] = useState('Select Rating');

  function OnClickEvent () {
    setColor('rgb(103, 182, 109)');
    SetBorderColor('1px solid rgb(103, 182, 109)');
  }

  const handleChange = (e) => {
    setRating(e.target.value);
    setButtonLabel('Rate: ');
    setColor('#92a2a8')
  }

  async function handleSubmit (e) {
    e && e.preventDefault();
    const userName = localStorage.getItem('userName');
    if (!rating) return;
    else {
      await insertRating({ userName, trackId: props.track.id, rating })
      props.updateState()
      setButtonLabel('Rating stored: ');
    }

  }

  const btnClass = classNames({
    rate_button: true,
    'rate_button_disabled': !rating
  });

  useEffect(() => {
    function markAsRated () {
      if (props.track.hasOwnProperty('rating')) {
        setRating(props.track.rating);
        setButtonLabel('Already Rated: ');
      }
    }
    markAsRated();
  }, [])

  const displayedRating = buttonLabel === 'Select Rating'
    ? buttonLabel
    : `${buttonLabel}${rating}`;

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
              value={rating}
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
              onClick={() => { OnClickEvent() }}>{displayedRating}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrackItem;
