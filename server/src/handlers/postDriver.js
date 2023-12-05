const { createDriver } = require('../../controllers/postRouteController.js');

const postDriver = async (req, res) => {
  const { name, lastName, description, image, nationality, birthDate, teamIds } = req.body;

  try {
    const newDriver = await createDriver({
      name,
      lastName,
      description,
      image,
      nationality,
      birthDate,
      teamIds,
    });

    res.status(201).json({ message: 'Conductor creado exitosamente', driver: newDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el conductor' });
  }
};

module.exports = postDriver;