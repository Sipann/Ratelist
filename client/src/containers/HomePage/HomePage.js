import React, { useState, useEffect } from 'react';

import { getRatingsByUser } from '../../services/dbService';
import { getTracks } from '../../services/spotifyService';

import RatedList from '../../components/RatedList/RatedList';

import './HomePage.css';

function HomePage () {
  const [rateList, setRateList] = useState(null);

  async function getTracksMetadata () {
    const res = await getRatingsByUser();
    const spotifyTrackList = await getTracks(res.map(i => i.trackId));

    for (let i = 0; i < spotifyTrackList.tracks.length; i++) {
      const obj = res.find(track => track.trackId === spotifyTrackList.tracks[i].id);
      spotifyTrackList.tracks[i].rating = obj.rating;
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