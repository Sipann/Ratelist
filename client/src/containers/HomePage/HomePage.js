import React from 'react';

import RatedList from '../../components/RatedList/RatedList';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

import './HomePage.css';

function HomePage (props) {

  return (
    <div className="home-page-container">
      <NavigationBar />
      <div className='ratings-container'>
        {(props.isEmpty) && <div className="no-content">You have not rated any tracks yet.</div>}
        {(props.rateList) && <RatedList className='rated-list' ratedTracks={props.rateList} />}
      </div>
    </div>
  );
}

export default HomePage;