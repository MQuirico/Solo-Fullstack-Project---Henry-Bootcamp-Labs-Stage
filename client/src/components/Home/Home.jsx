import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DriverCard from '../Driver Card/DriverCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../Search Bar/SearchBar.jsx';
import Navbar from '../NavBar/NavBar.jsx';
import { searchDrivers } from '../../redux/actionCreator.js';
import './Home.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('ALL');
  const [originSort, setOriginSort] = useState('ALL');
  const driversPerPage = 9;

  const searchResults = useSelector((state) => state.search.searchResults);
  const allDrivers = useSelector((state) => state.fetch.allDrivers);
  const teamsState = useSelector((state) => state.collectTeams);

  let drivers = (searchResults && searchResults.length > 0) ? searchResults : allDrivers;

  if (originSort === 'Api') {
    drivers = drivers.filter(driver => typeof driver.id === 'number');
  } else if (originSort === 'BDD') {
    drivers = drivers.filter(driver => typeof driver.id === 'string');
  }

  const filteredDrivers = selectedTeam !== 'ALL'
    ? drivers.filter(driver => driver.teams === selectedTeam)
    : drivers;

  const sortedDrivers = isSorted
    ? [...filteredDrivers].sort((a, b) => a.name?.forename?.localeCompare(b.name.forename))
    : filteredDrivers;

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = sortedDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const totalPages = Math.ceil(sortedDrivers.length / driversPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchTerm) => {
    dispatch(searchDrivers(searchTerm));
  };

  const handleSortChange = (event) => {
    setIsSorted(event.target.checked);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleOriginInputChange = (event) => {
    setOriginSort(event.target.value);
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      <div id='filters'>
        <select onChange={handleOriginInputChange}>
          <option value="ALL">ALL</option>
          <option value="Api">Api</option>
          <option value="BDD">Base Datos</option>
        </select>

        <input type="checkbox" onChange={handleSortChange} /> Sort alphabetically
        <select className='teams' onChange={handleTeamChange}>
          <option value="ALL">ALL</option>
          {teamsState.data.map((team) => (
            <option value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div id="homeP">
        {currentDrivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default HomePage;