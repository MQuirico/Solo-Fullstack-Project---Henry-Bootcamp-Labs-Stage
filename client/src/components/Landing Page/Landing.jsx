import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; 
function Landing() {
  return (
    <div id="land" className="blog">
      <Link to="/Home">
        <button id='ingresar'>Clic aquí para ingresar</button>
      </Link>
      <header id="header">
        <h1 id='title'>
          <u>🏁DRIVERS</u>
        </h1>
        <img id='imgF1' src="../Form1.png" alt="Logo" />
      </header>
      <div className="descripcion">
        <section className="intro">
          <h3>
            Sitio creado para la etapa de <u>Proyecto Individual</u> del Bootcamp en{' '}
            <u>Desarrollo FullStack de Henry</u>.
            <br />
            Desarrollado por el alumno <u>Matías Quirico</u>.
          </h3>
          <p id="descr">
            Este proyecto abarca el conocimiento adquirido en los cuatro módulos de la etapa
            previa de este bootcamp. Se ha desarrollado tanto el Front-End como el Back-End de
            una Single Page Application, así como también la Base de Datos en la que se almacenan
            los pilotos/conductores mediante un Formulario Controlado.
            <br />
            <strong>(PD: no tengo más migraciones disponibles, por favor considere esto)</strong>
          </p>
        </section>
        <section className="tematica">
          <h2 id="titTemat">Temática:</h2>
          <p id="descTem">Para el presente proyecto se me ha asignado la temática referida a conductores de Fórmula 1.</p>
        </section>
      </div>
      <div className="tecnologias">
        <h2>Tecnologías usadas en este proyecto</h2>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Sequelize</li>
        </ul>
      </div>
    </div>
  );
}

export default Landing;
