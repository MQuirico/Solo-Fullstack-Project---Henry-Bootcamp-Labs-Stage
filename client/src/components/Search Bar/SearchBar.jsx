/* import React, { useState } from 'react';
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
      <button id='searchButton' onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar; */

import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use debounce to delay the search function
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm); // Trigger search in parent
    }, 300);

    return () => clearTimeout(delayDebounce); // Clear timeout if searchTerm changes
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input

      type="text"
      id="search"
      placeholder="Buscar conductor..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;