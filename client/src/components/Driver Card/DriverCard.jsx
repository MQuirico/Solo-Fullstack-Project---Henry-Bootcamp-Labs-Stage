import React from 'react';
import { Link } from 'react-router-dom';
import './DriverCard.css';

const DriverCard = ({ driver }) => {
  if (typeof driver.id === 'string'){
    const blob = new Blob([driver.image.data], { type: 'image/jpeg' });
const imageUrl = URL.createObjectURL(blob);
    return (
      <div id="card">
    <Link to={`/driverDetail/${driver.id}`} className="driver-card">
        <img src={imageUrl} alt={`${driver?.name} ${driver?.lastName}`} />
        <h2>{`${driver?.name} ${driver?.lastName}`}</h2>
        <p>Team: {driver?.teams}</p>
        <h3 id="icon">🏎️</h3>
        <h3 id="icon2">🏁</h3>
      </Link>
    </div>
    )
  }
  return (
    <div id="card">
    <Link to={`/driverDetail/${driver.id}`} className="driver-card">
        <img src={driver?.image?.url} alt={`${driver?.name?.forename} ${driver?.name?.surname}`} />
        <h2>{`${driver?.name?.forename} ${driver?.name?.surname}`}</h2>
        <p>Team: {driver?.teams}</p>
        <h3 id="icon">🏎️</h3>
        <h3 id="icon2">🏁</h3>
      </Link>
    </div>
  );
};

export default DriverCard;