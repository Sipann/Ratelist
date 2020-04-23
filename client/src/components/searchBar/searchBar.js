import React, { useState } from 'react';
import './searchBar.css';

function SearchBar ({ getTracks }) {

  const [input, setInput] = useState('');

  const handleTrackChange = (e) => {
    setInput(e.target.value);
    getTracks(e.target.value);
  }

  return (
    <div className='search_bar_container'>
      <form className='search_bar'>
        <input
          className='input_field'
          type='text'
          value={input}
          onChange={handleTrackChange}
          placeholder='Search tracks'>
        </input>
      </form>
    </div>
  )
}

export default SearchBar;