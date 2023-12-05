const express = require ("express");
const json = require ("express");
const router = require ("./routes/mainRouter.js");
const morgan = require ("morgan");
const cors = require ("cors");

const server = express();

server.use(morgan("dev"));// indica que el middleware se va a usar en el ambito de development
server.use(json());
server.use(cors({
  origin: 'http://localhost:5173',
}));server.use(router);


  // Iniciar el servidor
server.listen(port = 3000, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = server;
