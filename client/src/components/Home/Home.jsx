import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DriverCard from '../Driver Card/DriverCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../Search Bar/SearchBar.jsx';
import Navbar from '../NavBar/NavBar.jsx'
import './Home.css';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;
  const drivers = useSelector((state) => state.fetch.allDrivers);

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h1>Página Principal</h1>
      <SearchBar />
      <DriverCard drivers={currentDrivers} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(drivers.length / driversPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
