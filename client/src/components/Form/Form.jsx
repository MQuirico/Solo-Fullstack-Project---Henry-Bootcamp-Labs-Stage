import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver } from '../../redux/actionCreator.js';
import { fetchData } from '../../redux/actionCreator.js';
import { useForm } from "react-hook-form"
import Navbar from '../NavBar/NavBar.jsx';
import PositionedSnackbar from "../ToastAlert/toastAlert"
import './Form.css'

const FormPage = () => {
  const dispatch = useDispatch();
  const [isCreated, setIsCreated] = useState(false)
  const {data} = useSelector((state) => state.collectTeams)
  const { register, handleSubmit, reset, formState, resetField, clearErrors } = useForm()

  const handlerSubmit = (data) => {
    dispatch(createDriver(data))
    reset()
    setIsCreated(true)
  };

console.log(formState)


  return (
    <>
    <Navbar />
    
      <h1 id='titulo'>Ingrese los datos del conductor a crear</h1>
      <form id='form' onSubmit={handleSubmit(handlerSubmit)}>
        
          <label htmlFor="nombre">Nombre *</label>
          <input
            placeholder='Ingrese aquí su nombre...'
            type="text"
            maxLength= "50"
            id="nombre"
            name="nombre"
            {...register("nombre", {required: "Ingrese el nombre del conductor"})}
           
          />
          
        
          <label htmlFor="apellido">Apellido *</label>
          <input
            placeholder='Aquí su apellido...'
            type="text"
            maxLength= "50"
            id="apellido"
            name="apellido"
            {...register("apellido", {required: "Ingrese el apellido del conductor"})}
            
          />
          
        
          <label htmlFor="descripcion">Descripción *</label>
          <textarea
            maxLength="500"
            placeholder='Dé una presentación del conductor...'
            id="descripcion"
            name="descripcion"
            {...register("descripcion", {required: "Ingrese una descripción"})}
          />
          
        
          <label htmlFor="nacionalidad">Nacionalidad *</label>
          <input
            placeholder='Ingrese su nacionalidad...'
            type="text"
            maxLength= "50"
            id="nacionalidad"
            name="nacionalidad"
            {...register("nacionalidad", {required: "Ingrese la nacionalidad del conductor" })}
          />
          
        
        <select id='teams selector' 
      
        {...register("escudería", {required: "Seleccione una escudería"})}
        >
           {data.map((team)=>(
            <option value={team}>{team}</option>
          ))} 
        </select>
        
        
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
          <input
            placeholder='Ingrese la fecha con el siguiente formato: (DD/MM/YYYY)'
            type="text"
            maxLength= "50"
            id="fechaNacimiento"
            name="fechaNacimiento"
            {...register("fechaNacimiento", {required: "Falta la fecha de nacimiento", pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, message: "El formato es incorrecto"})}
           
          />
          

          <label htmlFor="imagen">Imagen *</label>
          <input
            type="file"
            id="imagen"
            maxLength= "50"
            name="imagen"
            {...register("imagen", {required: "Suba una imagen de perfil del conductor"})}
            accept="image/*"
          />
        
        <button type="submit" >
          Crear Conductor
        </button>
      </form>
      {formState?.errors?.nombre?.type === "required" && <h3 className="erReqNom">{formState?.errors?.nombre?.message} </h3>}
      {formState?.errors?.apellido?.type === "required" && <h3 className="erReqApe">{formState?.errors?.apellido?.message} </h3>}
      {formState?.errors?.descripcion?.type === "required" && <h3 className="erReqDesc">{formState?.errors?.descripcion?.message} </h3>}
      {formState?.errors?.nacionalidad?.type === "required" && <h3 className="erReqNac">{formState?.errors?.nacionalidad?.message} </h3>}
      {formState?.errors?.escudería?.type === "required" && <h3 className="erReqTeam">{formState?.errors?.escudería?.message} </h3>}
      {formState?.errors?.fechaNacimiento?.type === "required" && <h3 className="erReqBirth">{formState?.errors?.fechaNacimiento?.message} </h3>}
      {formState?.errors?.fechaNacimiento?.type === "pattern" && <h3 className="erPattBirth">Ingrese una fecha con formato válido</h3>}
      {formState?.errors?.imagen?.type === "required" && <h3 className="erReqImg">{formState?.errors?.imagen?.message} </h3>}
      {isCreated === true && <PositionedSnackbar />}
    </>
  );
};


export default FormPage;
