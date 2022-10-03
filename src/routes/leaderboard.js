const express = require('express');
const getLeaderboard = require('../controllers/leaderboard.controller');
const leaderboardRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

leaderboardRouter.get("/get/", getLeaderboard);

module.exports = leaderboardRouter
