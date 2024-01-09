const { Driver, Team } = require('../src/db.js');

async function createDriver({ nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, teamIds }) {
  try {
    const newDriver = await Driver.create({
      name: nombre,
      lastName: apellido,
      description: descripcion,
      image: imagen,
      nationality: nacionalidad,
      birthDate: fechaNacimiento,
    });

    if (teamIds && teamIds.length > 0) {
      const teams = await Team.findAll({
        where: {
          id: teamIds,
        },
      });

      try {
        await newDriver.addTeams(teams);
      } catch (error) {
        console.error(error);
        throw new Error('Error al asociar el conductor con los equipos');
      }
    }

    return newDriver;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el conductor');
  }
}

module.exports = {
  createDriver,
};