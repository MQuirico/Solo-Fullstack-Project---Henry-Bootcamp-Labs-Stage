const reachDbApi = require('../../controllers/reachDbApi.js');
const getDriverDetail = async (req, res) => {
  const { idDriver } = req.params;

  try {
    const dbDriver = await Driver.findByPk(idDriver, { include: Team });
    const apiDriver = await reachDbApi(`/drivers/${idDriver}`)(req, res);
    const combinedDriver = { ...dbDriver.dataValues, ...apiDriver };
    res.json(combinedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el detalle del driver', message: error.message });
  }
};

module.exports = getDriverDetail;
