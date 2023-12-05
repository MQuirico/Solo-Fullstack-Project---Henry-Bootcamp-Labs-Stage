// Detail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDriverDetail } from 'tu-accion-redux';

const Detail = () => {
  const { idDriver } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driverDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDriverDetail(idDriver));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, idDriver]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalle del Conductor</h1>
      <div>
        <img src={driver.image.url} alt={driver.driverRef} />
      </div>
      <div>
        <h2>{`${driver.name.forename} ${driver.name.surname}`}</h2>
        <p>Nacionalidad: {driver.nationality}</p>
        <p>Fecha de Nacimiento: {driver.dob}</p>
        <p>Equipos: {driver.teams}</p>
        <p>Descripción: {driver.description}</p>
        <p>
          <a href={driver.url} target="_blank" rel="noopener noreferrer">
            Más información
          </a>
        </p>
      </div>
    </div>
  );
};

export default Detail;
