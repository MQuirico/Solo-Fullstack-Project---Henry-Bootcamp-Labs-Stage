import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver } from '../../redux/actionCreator.js';
import { useForm } from "react-hook-form"
import Navbar from '../NavBar/NavBar.jsx';
import PositionedSnackbar from "../ToastAlert/toastAlert";
import UploadWidget from "./uploadWidget.jsx"
import './Form.css'

const FormPage = () => {
  const dispatch = useDispatch();
  const [isCreated, setIsCreated] = useState(false)
  const [picture, setPicture] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const {data} = useSelector((state) => state.collectTeams)
  const { register, handleSubmit, reset, formState, resetField, clearErrors } = useForm()

  const handlerSubmit = (data) => {
    if (picture === null){
      window.alert("Sube una imagen de perfil del conductor")
    }
    else
   { dispatch(createDriver({
      imagen: picture,
      ...data}))
    reset()
    setIsCreated(true)}
  };

  const teams = [null, ...data]
  console.log(picture)

  const root = document.querySelector(":root")

  root.addEventListener("click", ()=>{
    setIsCreated(false)
  })

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'ds4blfuip', 
      uploadPreset: 'ml_default',
      sources: ['local', 'url'], 
      resourceType: 'image', 
      clientAllowedFormats: ['jpg', 'png', 'jpeg'],
      maxFiles: 1
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log(result)
        setPicture(result.info.secure_url)
        setDisabled(true)
      }
    }
  );

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
          
        <label htmlFor="teams">Escudería *</label>
        <select 
        id='teams selector'
        name="teams" 
        {...register("escudería", {required: "Seleccione una escudería"})}
        >
           {teams.map((team, index)=>(
            <option key={index} value={team}>{team}</option>
          ))} 
        </select>
        
        
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
          <input
            placeholder='Ingrese la fecha con el siguiente formato: (DD/MM/YYYY)'
            type="text"
            maxLength= "50"
            id="fechaNacimiento"
            name="fechaNacimiento"
            {...register("fechaNacimiento", 
            {required: "Falta la fecha de nacimiento", 
            pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, 
            message: "El formato es incorrecto"})}
           
          />
          

          <UploadWidget widget={widget} disabled={disabled} />
        
        <button type="submit">
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
      
      {isCreated === true && <PositionedSnackbar />}
    </>
  );
};


export default FormPage;
