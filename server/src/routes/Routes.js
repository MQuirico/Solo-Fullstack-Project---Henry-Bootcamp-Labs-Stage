const express = require ("express");
const getDrivers = require ('../handlers/getDrivers.js');
const getDriverDetail = require ('../handlers/getDriverDetail.js');
const getDriverNameQuery = require ('../handlers/getDriverNameQuery.js');
const getTeams = require ('../handlers/getTeams.js');
const postDriver = require ('../handlers/postDriver.js');
const Routes = express.Router();

Routes.get('/drivers', getDrivers)
Routes.get('/drivers/:idDriver', getDriverDetail);
Routes.get('/drivers/name', getDriverNameQuery);
Routes.get('/teams', getTeams);
Routes.post('/drivers', postDriver)

module.exports = Routes