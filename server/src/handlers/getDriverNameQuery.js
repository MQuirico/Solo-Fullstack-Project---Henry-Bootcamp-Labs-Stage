const reachDbApi = require('../../controllers/reachDbApi.js');

const getDriverNameQuery = async (req, res) => {
  const { query } = req.query;

  try {
    const dbDrivers = await Driver.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      limit: 15,
    });
    const apiDrivers = await reachDbApi(`/drivers/name?=${query}`)(req, res);
    const combinedDrivers = [...dbDrivers.map(driver => driver.dataValues), ...apiDrivers];
    res.json(combinedDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los drivers por nombre', message: error.message });
  }
};

module.exports = getDriverNameQuery;