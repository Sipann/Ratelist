import React from 'react';
import { Redirect, BrowserRouter } from 'react-router-dom';

function Credentials () {

  const search = window.location.search;
  const params = new URLSearchParams(search);

  const token = params.get('token');
  const userName = params.get('username');

  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);

  return (
    <BrowserRouter>
      <Redirect to="/searchRate" />
    </BrowserRouter>
  );

}

export default Credentials;
