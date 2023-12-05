import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {searchDrivers} from '../../redux/actionCreator.js';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchDrivers(searchTerm));
  };

  return (
    <div className="search-bar-container">
      <input
        id="search"
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;