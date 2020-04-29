import React from 'react';

import './NavigationBar.css';
import { Link } from "react-router-dom";

function NavigationBar () {

  return (
    <nav className='nav-container'>
      <Link className='btn-nav btn-my-ratings' to="/home">My ratings</Link>
      <Link className='btn-nav' to="/searchRate">Search & Rate</Link>
      <Link className='btn-nav' to="/soulmates">Soulmates</Link>
    </nav>
  )
}

export default NavigationBar;
