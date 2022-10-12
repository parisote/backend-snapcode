const express = require('express')
const postRouter = express.Router()
const { createPost, getAll } = require('../controllers/post.controller');
const { validatePost } = require('../validators/validate.post.dto');

postRouter.post("/", validatePost, createPost)
postRouter.get("/", getAll)

module.exports = postRouter
