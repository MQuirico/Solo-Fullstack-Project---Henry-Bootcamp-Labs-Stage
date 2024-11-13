import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DriverCard from '../Driver Card/DriverCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../Search Bar/SearchBar.jsx';
import Navbar from '../NavBar/NavBar.jsx';
import './Home.css';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('ALL');
  const [originSort, setOriginSort] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const driversPerPage = 9;

  const {allDrivers} = useSelector((state) => state.fetch);
  const teamsState = useSelector((state) => state.collectTeams);
  console.log(allDrivers)
  const filteredDrivers = allDrivers
  .filter((driver) => {
    const teamMatch = selectedTeam === 'ALL' || (Array.isArray(driver?.teams) ? driver?.teams?.includes(selectedTeam) : driver?.teams === selectedTeam);

    const originMatch =
      originSort === 'ALL' ||
      (originSort === 'Api' && typeof driver?.id === 'number') ||
      (originSort === 'BDD' && typeof driver?.id === 'string');

    // Filtrar por término de búsqueda
    const searchMatch =
      (driver?.name?.forename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.name?.surname?.toLowerCase().includes(searchTerm.toLowerCase()));

    return teamMatch && originMatch && searchMatch
  });
  console.log(filteredDrivers)

  

  // Ordenar conductores si está activado
  const sortedDrivers = isSorted
    ? [...filteredDrivers].sort((a, b) => a.name?.forename?.localeCompare(b.name.forename))
    : filteredDrivers;

  // Paginación
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = sortedDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  const totalPages = Math.ceil(sortedDrivers.length / driversPerPage);

  // Manejadores de eventos
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleSortChange = () => setIsSorted((prev) => !prev);
  const handleTeamChange = (e) => setSelectedTeam(e.target.value);
  const handleOriginChange = (e) => setOriginSort(e.target.value);
  const handleSearch = (term) => setSearchTerm(term);

  console.log("current ====>", currentDrivers)
  return (
    <>
      <Navbar />
      <div id="homeP">
        <SearchBar onSearch={handleSearch} />
        <div id="filters">
          <select onChange={handleOriginChange}>
            <option value="ALL">Todos</option>
            <option value="Api">API</option>
            <option value="BDD">Base de Datos</option>
          </select>
          <label>
            <input type="checkbox" onChange={handleSortChange} checked={isSorted} />
            Ordenar alfabéticamente
          </label>
          <select onChange={handleTeamChange} value={selectedTeam}>
            <option value="ALL">Todos</option>
            {teamsState?.data?.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="cardsSection">
          {allDrivers.length === 0 && <p className="loading">Cargando...</p>}
          {allDrivers.length > 0 && currentDrivers.length === 0 && <p className="warning">No hay resultados para los criterios seleccionados</p>}
          {currentDrivers.map((driver, index) => (
            <DriverCard key={index} driver={driver} />
          ))}
        </div>

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