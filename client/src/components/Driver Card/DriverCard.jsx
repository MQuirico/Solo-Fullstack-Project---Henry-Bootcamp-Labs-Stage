import React from 'react';
import { Link } from 'react-router-dom';
import './DriverCard.css';

const DriverCard = ({ driver }) => {
  const {teams} = driver
  console.log(typeof teams)

  return (
    <div id="card">
    <Link to={`/driverDetail/${driver.id}`} className="driver-card" state={{driver}}>
        <img src={driver?.image?.url || driver?.image} alt={`${driver?.name?.forename} ${driver?.name?.surname}`} />
        <h2>{`${driver?.name?.forename}`} <br/>{`${driver?.name?.surname}`}</h2>
        <p className="eachTeam">{teams}</p>
        <div className="icons">
        <h3 id="icon">🏎️</h3>
        <h3 id="icon2">🏁</h3>
        </div>
      </Link>
    </div>
  );
};

export default DriverCard; 


