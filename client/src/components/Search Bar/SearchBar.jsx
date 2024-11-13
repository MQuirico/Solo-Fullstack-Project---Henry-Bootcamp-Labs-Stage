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