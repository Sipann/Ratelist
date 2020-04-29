import React, { useState, useEffect } from 'react';

import { searchTracks, getTracks } from '../../services/spotifyService';
import { getRatingsByUser } from '../../services/dbService';

import SearchBar from '../../components/SearchBar/SearchBar';
import TrackList from '../../components/TrackList/TrackList';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

import './SearchRatePage.css';

function SearchRate ({ updateEmpty, updateList }) {
  const [tracks, setTracks] = useState(null);
  const [rateList, setRateList] = useState([]);

  async function fetchTracks (input) {
    if (!input.length) {
      setTracks(null);
      return;
    }
    const res = await searchTracks(input);
    res.tracks.items.forEach(item => {
      const alreadyRated = rateList.tracks.find(rated => rated.id === item.id);
      if (alreadyRated) {
        item.rating = alreadyRated.rating;
      }
    });

    setTracks(res);
  }

  async function getTracksMetadata () {
    const res = await getRatingsByUser();
    if (!res.length) return;
    const spotifyTrackList = await getTracks(res.map(i => i.trackId));


    for (let i = 0; i < spotifyTrackList.tracks.length; i++) {
      const obj = res.find(track => track.trackId === spotifyTrackList.tracks[i].id);
      spotifyTrackList.tracks[i].rating = obj.rating;
    }

    updateEmpty(false);
    updateList(spotifyTrackList);
    setRateList(spotifyTrackList);
  }


  useEffect(() => {
    getTracksMetadata()
  }, []);

  return (
    <div className="search-rate-container">
      <NavigationBar />
      <SearchBar
        data-testid="searchBar"
        getTracks={fetchTracks} />
      <div>
        {tracks && <TrackList data-testid="trackList" tracks={tracks} updateState={getTracksMetadata} />}
      </div>
    </div>
  );
}

export default SearchRate;