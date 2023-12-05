const { get } = require('axios');

module.exports = function reachDbApi(filePath) {
  return async (req, res) => {
    try {
      const localData = await get(`http://localhost:5000${filePath}`);
      const externalData = await get(`http://localhost:5000${filePath}`);
      res.json(externalData.data || localData.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los datos', message: error.message });
    }
  };
};