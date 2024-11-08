import React from 'react';
import { Link } from 'react-router-dom';
import './DriverCard.css';

const DriverCard = ({ driver }) => {
  const {teams} = driver
  console.log(typeof teams)

  if (typeof driver.id === 'string'){
    const blob = new Blob([driver?.image?.data], { type: 'image/jpeg' })
    console.log(driver)
const imageUrl = URL.createObjectURL(blob);
    return (
      <div id="card">
    <Link to={`/driverDetail/${driver.id}`} className="driver-card" state={{driver}}>
        <img src={imageUrl} alt={`${driver?.name} ${driver?.lastName}`} />
        <h2>{`${driver?.name} ${driver?.lastName}`}</h2>
        <p className="eachTeam">{teams}</p>
        <div className="icons">
        <h3 id="icon">🏎️</h3>
        <h3 id="icon2">🏁</h3>
        </div>
      </Link>
    </div>
    )
  }
  return (
    <div id="card">
    <Link to={`/driverDetail/${driver.id}`} className="driver-card" state={{driver}}>
        <img src={driver?.image?.url} alt={`${driver?.name?.forename} ${driver?.name?.surname}`} />
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


