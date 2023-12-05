const { Router } = require ("express");
const Routes = require ('./Routes.js');
const server = Router();

server.use("/drivers", Routes)

module.exports = server;
