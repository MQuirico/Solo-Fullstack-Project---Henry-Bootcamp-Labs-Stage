import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDrivers } from '../../redux/actionCreator.js';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSelector((state) => state.search.searchResults);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchDrivers(searchTerm));
  };

  console.log("Search results:", searchResults);
  
  return (
    <div id="search-bar-container">
      <input
        id="search"
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button id='boton' onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;