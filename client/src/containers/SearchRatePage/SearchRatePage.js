import React, { useState, useEffect } from 'react';

import { searchTracks, getTracks } from '../../services/spotifyService';
import { getRatingsByUser } from '../../services/dbService';

import SearchBar from '../../components/SearchBar/SearchBar';
import TrackList from '../../components/TrackList/TrackList';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

import './SearchRatePage.css';

function SearchRate ({updateEmpty, updateList}) {
  const [tracks, setTracks] = useState(null);

  async function fetchTracks (input) {
    const res = await searchTracks(input);
    setTracks(res);
  }


  useEffect(() => {
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
    }
    getTracksMetadata()
  }, [updateEmpty, updateList]);

  return (
    <div className="search-rate-container">
      <NavigationBar />
      <SearchBar
        data-testid="searchBar"
        getTracks={fetchTracks} />
      <div>
        {tracks && <TrackList data-testid="trackList" tracks={tracks} />}
      </div>
    </div>
  );
}

export default SearchRate;