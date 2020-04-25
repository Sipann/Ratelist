import React, { useState, useEffect } from 'react';

import { GetRatingsByUser } from '../../services/dbService';
import { getTracks } from '../../services/spotifyService';

import RatedList from '../../components/RatedList/RatedList';

import './HomePage.css';

function HomePage () {

  const [trackRatings, setTrackRatings] = useState([]);
  const [rateList, setRateList] = useState(null);

  async function getTracksMetadata () {
    console.log('getTracksMetadata is being called form home page');
    const res = await GetRatingsByUser();
    const trackIds = [];
    const trackRatings = [];

    res.forEach((track) => {
      trackIds.push(track.trackId)
      trackRatings.push(track.rating)
    })
    setTrackRatings(trackRatings); //reversing ratings to match reversed trackIds array.

    console.log('trackIds', trackIds);
    const spotifyTrackList = await getTracks(trackIds);
    console.log('spotifyTrackList', spotifyTrackList);
    for (let i = 0; i < trackRatings.length; i++) {
      spotifyTrackList.tracks[i].rating = trackRatings[i]; //insert track rating to each track on spotify res obj.
    }

    setRateList(spotifyTrackList);
  }

  useEffect(() => {
    getTracksMetadata()
  }, []);

  return (
    <div className="home">
      <header className='home_header_container'>
        <nav className='nav_container'>
          <a className='myRatings_button_' href="/home">My ratings</a>
          <a className='searchRate_button_' href="/searchRate">Search & Rate</a>
          <a className='soulmates_button_' href="/soulmates">Soulmates</a>
        </nav>
      </header>
      <div className='ratings_container'>
        {(rateList) && <RatedList className='rated_list' ratedTracks={rateList} />}
      </div>
    </div>
  );
}

export default HomePage;