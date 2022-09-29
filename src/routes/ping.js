const express = require('express');
const ping = require('../controllers/ping.controller');
const pingRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

pingRouter.get("/", ping);

module.exports = pingRouter