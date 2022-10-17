const express = require('express')
const getLeaderboard = require('../controllers/leaderboard.controller');
const getUserTimeline = require('../controllers/timeline.controller');
const postRouter = express.Router()
const { createPost, getAll, getById } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.get("/", getAll)
postRouter.get("/:id", getById)
postRouter.post("/:id", validatePost, createPost)

postRouter.get("/leaderboard/", getLeaderboard);
postRouter.get("/timeline/:id", getUserTimeline);

module.exports = postRouter