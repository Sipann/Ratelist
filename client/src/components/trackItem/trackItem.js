import React, { useState } from 'react';
import { InsertRating } from '../../services/dbService'
import './trackItem.css';

const userName = localStorage.getItem('userName')

function TrackItem (props) {
    
    //getting rating and trackID. Posting rating to db.

    const [trackId, setTrackId] = useState('');
    const [rating, setRating] = useState('');

    const handleChange = (e) => {
        setRating(e.target.value);
        setTrackId(e.target.getAttribute('data-trackid'));
    }
    
    async function handleSubmit (e) {
        e && e.preventDefault();
        if (trackId && rating && userName) InsertRating({userName, trackId, rating});
        setTrackId('');
        setRating('');
    }

return (
    <div>
        <div  className='track_container'>
            <div className='album_cover'>
                <img src={`${props.track.album.images[0].url}`} alt='album cover'/>
            </div>
            <div className='track_info_rating'>
                <div className='track_details'>
                    <p className='track_name'>{props.track.name}</p>
                    <p className='album_name'>{props.track.album.name}</p>
                </div>
                <form className='track_rating' onSubmit={handleSubmit}>
                    <input 
                        className='rating_selector' 
                        type='range' 
                        id='rating' 
                        min='0' 
                        max='10'
                        data-trackid={props.track.id}
                        onChange={handleChange}
                    ></input>
                    <button type='submit' className='rate_button'>Rate track</button>
                </form>
            </div>
        </div>
    </div>
)
}

export default TrackItem;