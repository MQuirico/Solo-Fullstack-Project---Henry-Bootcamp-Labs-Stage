import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actionCreator.js';
import { Link } from 'react-router-dom';
import './DriverCard.css';

const DriverCard = ({ drivers }) => {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.fetch.allDrivers); // Asegúrate de tener un slice 'drivers' en tu estado redux

  const [teamFilter, setTeamFilter] = useState(null);
  const [originFilter, setOriginFilter] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'team') {
      setTeamFilter(value);
    } else if (filterType === 'origin') {
      setOriginFilter(value);
    }
  };

  const handleSortChange = (sortByValue) => {
    setSortBy(sortByValue);
  };

  const filteredDrivers = driversData.filter((driver) => {
    return (
      (!teamFilter || driver.teams === teamFilter) &&
      (!originFilter || driver.origin === originFilter)
    );
  });

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.forename.localeCompare(b.name.forename);
    } else if (sortBy === 'birthYear') {
      return a.dateOfBirth.localeCompare(b.dateOfBirth);
    }
    return 0;
  });

  return (
    <div className="card">
      <div>
        <label>
          Team Filter:
          <select onChange={(e) => handleFilterChange('team', e.target.value)}>
            <option value="">All</option>
            {/* Llena las opciones según los equipos disponibles */}
            {/* Por ejemplo: <option value="Ferrari">Ferrari</option> */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Origin Filter:
          <select onChange={(e) => handleFilterChange('origin', e.target.value)}>
            <option value="">All</option>
            {/* Llena las opciones según los orígenes disponibles */}
            {/* Por ejemplo: <option value="API">API</option> */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort By:
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="birthYear">Birth Year</option>
          </select>
        </label>
      </div>
      {sortedDrivers.map((driver, i) => (
        <Link to={`/driver/${driver.id}`} key={i} className="driver-card">
          <img src={driver?.image?.url} alt={`${driver?.name?.forename} ${driver?.name?.surname}`} />
          <h2>{`${driver?.name?.forename} ${driver?.name?.surname}`}</h2>
          <p>Team: {driver?.teams}</p>
        </Link>
      ))}
    </div>
  );
};

export default DriverCard;

