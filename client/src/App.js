import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CredentialsPage from './containers/CredentialsPage/CredentialsPage';
import HomePage from './containers/HomePage/HomePage';
import LandingPage from './containers/LandingPage/LandingPage';
import SearchRatePage from './containers/SearchRatePage/SearchRatePage';

function App () {

  const [rateList, setRateList] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);

  function updateList (list) {
    setRateList([...list.tracks]);
  }

  function updateEmpty (value) {
    setIsEmpty(value);
  }

  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/credentials' component={CredentialsPage} />
        <Route exact path='/home' render={() => <HomePage rateList={rateList} isEmpty={isEmpty} />} />
        <Route exact path='/searchRate'
          render={() => <SearchRatePage updateList={updateList} updateEmpty={updateEmpty} />} />
      </Router>
    </div>
  );
}

export default App;