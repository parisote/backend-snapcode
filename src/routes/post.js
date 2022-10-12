const express = require('express')
const getLeaderboard = require('../controllers/leaderboard.controller');
const postRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

postRouter.get("/leaderboard/", getLeaderboard);

module.exports = postRouter
