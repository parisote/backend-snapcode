const express = require('express')
const getLeaderboard = require('../controllers/leaderboard.controller');
const getUserTimeline = require('../controllers/timeline.controller');
const postRouter = express.Router()
//traer los controllers
//a futuro hay que traer el middleware de authorization y de multer (file management)

postRouter.get("/leaderboard/", getLeaderboard);
postRouter.get("/timeline/:id", getUserTimeline);

module.exports = postRouter