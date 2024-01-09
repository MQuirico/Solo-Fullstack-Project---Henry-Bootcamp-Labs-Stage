// FormPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver } from '../../redux/actionCreator.js';
import { fetchData } from '../../redux/actionCreator.js';
import Navbar from '../NavBar/NavBar.jsx';
import './Form.css'

const FormPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    descripcion: '',
    imagen: null,
    nacionalidad: '',
    fechaNacimiento: '',
    teams: ''
  });

  const [formErrors, setFormErrors] = useState({
    nombre: false,
    apellido: false,
    descripcion: false,
    imagen: false,
    nacionalidad: false,
    fechaNacimiento: false,
  });
  
  const teams = useSelector((state) => state.collectTeams.teams)

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => !error) &&
      Object.values(formData).every((value) => value)
    );
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let error = false;
    switch (name) {
      case 'nombre':
      case 'apellido':
      case 'descripcion':
      case 'nacionalidad':
        error = value.length < 3; 
        break;
      case 'fechaNacimiento':
        error = !/^\d{2}\/\d{2}\/\d{4}$/.test(value);
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [name]: error });
    setFormData({ ...formData, [name]: type === 'file' ? e.target.files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const [day, month, year] = formData.fechaNacimiento.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        const formattedData = { ...formData, fechaNacimiento: formattedDate };
  
        dispatch(createDriver(formattedData));
        dispatch(fetchData());
      } catch (error) {
        window.alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  };

  const handleTeamChange = (e) =>{
    e.preventDefault();
    setFormData((prev) => ({...prev, teams: e.target.value}))
  }

  
  return (
    <>
    <Navbar />
    <div>
      <h1 id='titulo'>Formulario para Crear un Nuevo Conductor</h1>
      <form onSubmit={handleSubmit}>
        <div id='form'>
          <label htmlFor="nombre">Nombre *</label>
          <input
            placeholder='Ingrese aquí su nombre...'
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido *</label>
          <input
            placeholder='Aquí su apellido...'
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción *</label>
          <textarea
            placeholder='Dé una presentación del conductor...'
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nacionalidad">Nacionalidad *</label>
          <input
            placeholder='Ingrese su nacionalidad...'
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
          />
        </div>
        <select id='teams selector' onChange={handleTeamChange}>
          {teams.map((team)=>(
            <option value={team}>{team}</option>
          ))}
        </select>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
          <input
            placeholder='Ingrese la fecha con el siguiente formato: (DD/MM/YYYY)'
            type="text"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen *</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={!isFormValid()} >
          Crear Conductor
        </button>
      </form>
    </div>
    </>
  );
};


export default FormPage;
