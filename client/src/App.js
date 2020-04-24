import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import CredentialsPage from './containers/CredentialsPage/CredentialsPage';
import HomePage from './containers/HomePage/HomePage';
import LandingPage from './containers/LandingPage/LandingPage';
import SearchRatePage from './containers/SearchRatePage/SearchRatePage';


function App () {

  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/credentials' component={CredentialsPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/searchRate' component={SearchRatePage} />
      </Router>
    </div>
  );
}

export default App;