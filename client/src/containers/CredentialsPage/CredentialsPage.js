import React from 'react';
import { Redirect, Route, BrowserRouter, useLocation, useParams } from 'react-router-dom';
import SearchRatePage from '../SearchRatePage/SearchRatePage';
import { createBrowserHistory } from "history";

function Credentials () {

  const search = window.location.search;
  const params = new URLSearchParams(search);

  const token = params.get('token');
  const userName = params.get('username');

  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);


  return (
    <BrowserRouter>
      <Route exact path="/searchRate" component={SearchRatePage} />
      <Redirect to="/searchRate" />
    </BrowserRouter>
  );


}

export default Credentials;
