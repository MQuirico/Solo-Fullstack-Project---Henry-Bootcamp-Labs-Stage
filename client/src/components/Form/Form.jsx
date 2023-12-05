// FormPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../redux/actionCreator.js';
import { fetchData } from '../../redux/actionCreator.js';
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
  });

  const [formErrors, setFormErrors] = useState({
    nombre: false,
    apellido: false,
    descripcion: false,
    imagen: false,
    nacionalidad: false,
    fechaNacimiento: false,
  });

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => !error) &&
      Object.values(formData).every((value) => value)
    );
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Validaciones según el campo
    let error = false;
    switch (name) {
      case 'nombre':
      case 'apellido':
      case 'descripcion':
      case 'nacionalidad':
        error = value.length < 3; // Por ejemplo, mínimo 3 caracteres
        break;
      case 'fechaNacimiento':
        // Validar formato de fecha usando regex
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
        // Llama a la acción del reducer para crear el conductor
        await dispatch(createDriver(formData));
        // Llama a la acción del reducer para actualizar la lista después de crear el conductor
        dispatch(fetchData());
      } catch (error) {
        alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  };

  return (
    <div>
      <h1>Formulario para Crear un Nuevo Conductor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre *</label>
          <input
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
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nacionalidad">Nacionalidad *</label>
          <input
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento (DD/MM/YYYY) *</label>
          <input
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
  );
};


export default FormPage;
